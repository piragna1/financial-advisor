import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import { createPayment, getPayment } from "../../../../repositories/paymentRepository.js";
import { PaymentErrors } from "../../../../errors/paymentErrors.js";
import { expectErrorCode, expectDateEqual, expectNumericEqual } from "../../../helpers/testHelpers.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";
import {createMockFinancialProfile} from '../../../../actors/financialProfile/createMockFinancialProfile.js'
import { resetDatabase } from "../../../helpers/resetDatabase.js";
import {createMockLoan} from '../../../../actors/loan/createMockLoan.js'

describe("getPayment(id) – full suite", () => {
  let scheduleId;

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
  });

  const createValidPayment = async (overrides = {}) => {
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(dueDate.getDate() + 1);

    const payment = {
      id: uuidv4(),
      scheduleId,
      dueDate,
      amount: 500,
      currency: "USD",
      status: "pending",
      paidAt: null,
      method: "bank-transfer",
      reference: "TX-123",
      notes: "Initial payment",
      ...overrides
    };

    return await createPayment(payment);
  };

  describe("valid cases", () => {
   
    it("retrieves a complete valid payment", async () => {
      const payment = await createValidPayment();
      const result = await getPayment(payment.id);

      expect(result.id).toBe(payment.id);
      expect(result.scheduleId).toBe(payment.schedule_id);
      expectNumericEqual(result.amount, payment.amount);
      expect(result.currency).toBe(payment.currency);
      expect(result.status).toBe(payment.status);
      expect(result.method).toBe(payment.method);
      expect(result.reference).toBe(payment.reference);
      expect(result.notes).toBe(payment.notes);
      expectDateEqual(result.dueDate, payment.due_date);
      expect(result.paidAt).toBeNull();
    });

    it("retrieves a paid payment with paidAt", async () => {
      const paidAt = new Date();
      paidAt.setMonth(paidAt.getMonth() + 2);

      const payment = await createValidPayment({
        status: "paid",
        paidAt
      });

      const result = await getPayment(payment.id);
      expect(result.status).toBe("paid");
      expectDateEqual(result.paidAt, paidAt);
    });

    it("retrieves a payment with optional fields omitted", async () => {
      const payment = await createValidPayment({
        reference: undefined,
        notes: undefined
      });

      const result = await getPayment(payment.id);
      expect(result.reference).toBeNull();
      expect(result.notes).toBeNull();
    });
  });

  describe("invalid cases", () => {
    it("rejects malformed UUID", async () => {
      await expectErrorCode(getPayment("not-a-valid-id"), PaymentErrors.READ.INVALID_ID);
    });

    it("rejects non-existent ID", async () => {
      await expectErrorCode(getPayment(uuidv4()), PaymentErrors.READ.NOT_FOUND);
    });

    

    it("rejects payment with status 'paid' but missing paidAt", async () => {
      const invalid = {
        status: "paid",
        paidAt: null
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with paidAt but status not 'paid'", async () => {
      const paidAt = new Date();
      paidAt.setMonth(paidAt.getMonth() + 2);

      const invalid = {
        status: "pending",
        paidAt
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with reference > 50 chars", async () => {
      const invalid = {
        reference: "X".repeat(51)
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with notes > 255 chars", async () => {
      const invalid = {
        notes: "N".repeat(256)
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with invalid currency", async () => {
      const invalid = {
        currency: "BTC"
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with invalid method", async () => {
      const invalid = {
        method: "paypal"
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with invalid status", async () => {
      const invalid = {
        status: "processing"
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with negative amount", async () => {
      const invalid = {
        amount: -100
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with dueDate in the past", async () => {
      const pastDate = new Date();
      pastDate.setMonth(pastDate.getMonth() - 1);

      const invalid = {
        dueDate: pastDate
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });

    it("rejects payment with dueDate less than one month ahead", async () => {
      const nearFuture = new Date();
      nearFuture.setDate(nearFuture.getDate() + 10);

      const invalid = {
        dueDate: nearFuture
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA);
    });
  });
});
