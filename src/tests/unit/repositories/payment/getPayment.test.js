import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";
import { createPayment, getPayment } from "../../../../repositories/paymentRepository.js";
import { PaymentErrors } from "../../../../errors/paymentErrors.js";
import { expectErrorCode, expectDateEqual, expectNumericEqual } from "../../../helpers/testHelpers.js";

describe("getPayment(id) – full suite", () => {
  let scheduleId;

  beforeEach(async () => {
    await pool.query("DELETE FROM payments;");
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");

    const userId = uuidv4();
    const financialProfileId = uuidv4();
    const loanId = uuidv4();
    scheduleId = uuidv4();

    await pool.query(
      `INSERT INTO financial_profiles (id, user_id, salary, created_at, updated_at)
       VALUES ($1, $2, 5000, NOW(), NOW())`,
      [financialProfileId, userId]
    );

    await pool.query(
      `INSERT INTO loans (id, financial_profile_id, start_date, term_years, principal,
        interest_rate, payment_frequency_per_year, compounding_frequency_per_year,
        grace_period_months, balloon_payment, loan_type, currency,
        saved_at, updated_at)
       VALUES ($1, $2, '2025-10-01', 5, 10000,
        0.07, 12, 12, 0, null, 'personal', 'USD', NOW(), NOW())`,
      [loanId, financialProfileId]
    );

    await pool.query(
      `INSERT INTO schedules (id, plan, start_date, total_amount, currency, installments, loan_id, created_at, updated_at)
       VALUES ($1, 'monthly', '2025-10-01', 1000, 'USD', 2, $2, NOW(), NOW())`,
      [scheduleId, loanId]
    );
  });

  afterAll(async () => {
    await pool.query("DELETE FROM payments;");
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
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
      await expectErrorCode(getPayment("not-a-valid-id"), PaymentErrors.READ.INVALID_ID.code);
    });

    it("rejects non-existent ID", async () => {
      await expectErrorCode(getPayment(uuidv4()), PaymentErrors.READ.NOT_FOUND.code);
    });

    it("rejects payment with paidAt before dueDate", async () => {
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + 2);

      const paidAt = new Date();
      paidAt.setMonth(paidAt.getMonth() + 1);

      const invalid = {
        status: "paid",
        dueDate,
        paidAt
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with status 'paid' but missing paidAt", async () => {
      const invalid = {
        status: "paid",
        paidAt: null
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with paidAt but status not 'paid'", async () => {
      const paidAt = new Date();
      paidAt.setMonth(paidAt.getMonth() + 2);

      const invalid = {
        status: "pending",
        paidAt
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with reference > 50 chars", async () => {
      const invalid = {
        reference: "X".repeat(51)
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with notes > 255 chars", async () => {
      const invalid = {
        notes: "N".repeat(256)
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with invalid currency", async () => {
      const invalid = {
        currency: "BTC"
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with invalid method", async () => {
      const invalid = {
        method: "paypal"
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with invalid status", async () => {
      const invalid = {
        status: "processing"
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with negative amount", async () => {
      const invalid = {
        amount: -100
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with dueDate in the past", async () => {
      const pastDate = new Date();
      pastDate.setMonth(pastDate.getMonth() - 1);

      const invalid = {
        dueDate: pastDate
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });

    it("rejects payment with dueDate less than one month ahead", async () => {
      const nearFuture = new Date();
      nearFuture.setDate(nearFuture.getDate() + 10);

      const invalid = {
        dueDate: nearFuture
      };

      await expectErrorCode(createValidPayment(invalid), PaymentErrors.CREATE.INVALID_DATA.code);
    });
  });
});
