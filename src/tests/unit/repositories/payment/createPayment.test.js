import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";
import { createPayment } from "../../../../repositories/paymentRepository.js";
import { PaymentErrors } from "../../../../errors/paymentErrors.js";
import {
  expectErrorCode,
  expectDateEqual,
  expectNumericEqual,
} from "../../../helpers/testHelpers.js";

describe("createPayment(payment)", () => {
  let validScheduleId;
  let validLoanId;
  let validFinancialProfileId;

  let basePayment;

  beforeEach(async () => {
    await pool.query("DELETE FROM payments;");
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");

    validScheduleId = uuidv4();
    validLoanId = uuidv4();
    validFinancialProfileId = uuidv4();

    await pool.query(
      `INSERT INTO financial_profiles (
        id, user_id, salary, created_at, updated_at
      ) VALUES (
        $1, $2, 5000, NOW(), NOW()
      )`,
      [validFinancialProfileId, uuidv4()]
    );

    await pool.query(
      `INSERT INTO loans (
        id, financial_profile_id, start_date, term_years, principal,
        interest_rate, payment_frequency_per_year, compounding_frequency_per_year,
        grace_period_months, balloon_payment, loan_type, currency,
        saved_at, updated_at
      ) VALUES (
        $1, $2, '2025-10-01', 5, 10000,
        0.07, 12, 12,
        0, null, 'personal', 'USD',
        NOW(), NOW()
      )`,
      [validLoanId, validFinancialProfileId]
    );

    await pool.query(
      `INSERT INTO schedules (
        id, plan, start_date, total_amount, currency, installments, loan_id, created_at, updated_at
      ) VALUES (
        $1, 'monthly', '2025-10-01', 1000, 'USD', 2, $2, NOW(), NOW()
      )`,
      [validScheduleId, validLoanId]
    );

    basePayment = {
      id: uuidv4(),
      scheduleId: validScheduleId,
      dueDate: new Date("2025-11-01"),
      amount: 500,
      currency: "USD",
      status: "pending",
      paidAt: null,
      method: "bank-transfer",
      reference: "TX-123",
      notes: "Initial payment",
    };
  });

  afterAll(async () => {
    await pool.query("DELETE FROM payments;");
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should create a payment with valid data", async () => {
    const result = await createPayment(basePayment);
    expect(result.id).toBe(basePayment.id);
    expect(result.schedule_id).toBe(basePayment.scheduleId);
    expectDateEqual(result.due_date, basePayment.dueDate);
    expectNumericEqual(result.amount, basePayment.amount);
    expect(result.currency).toBe("USD");
    expect(result.status).toBe("pending");
    expect(result.method).toBe("bank-transfer");
    expect(result.reference).toBe("TX-123");
    expect(result.notes).toBe("Initial payment");
  });

  it("should reject malformed UUIDs", async () => {
    const invalid = { ...basePayment, id: "bad-id", scheduleId: "also-bad" };
    await expectErrorCode(
      createPayment(invalid),
      PaymentErrors.CREATE.INVALID_ID.code
    );
  });

  it("should reject missing required fields", async () => {
    const incomplete = { id: uuidv4(), scheduleId: validScheduleId };
    await expectErrorCode(
      createPayment(incomplete),
      PaymentErrors.CREATE.INVALID_DATA.code
    );
  });

  it("should reject invalid status values", async () => {
    const invalid = { ...basePayment, status: "unknown" };
    await expectErrorCode(
      createPayment(invalid),
      PaymentErrors.CREATE.INVALID_DATA.code
    );
  });

  it("should reject invalid method values", async () => {
    const invalid = { ...basePayment, method: "paypal" };
    await expectErrorCode(
      createPayment(invalid),
      PaymentErrors.CREATE.INVALID_DATA.code
    );
  });

  it("should reject negative amounts", async () => {
    const invalid = { ...basePayment, amount: -100 };
    await expectErrorCode(
      createPayment(invalid),
      PaymentErrors.CREATE.INVALID_DATA.code
    );
  });

  it("should reject non-existent scheduleId", async () => {
    const invalid = { ...basePayment, scheduleId: uuidv4() };
    await expectErrorCode(
      createPayment(invalid),
      PaymentErrors.CREATE.INVALID_ID.code
    );
  });

  it("should reject duplicate payment ID", async () => {
    await createPayment(basePayment);
    await expectErrorCode(
      createPayment({ ...basePayment }),
      PaymentErrors.CREATE.INVALID_ID.code
    );
  });

  it("should accept null paidAt for pending payments", async () => {
    const pending = { ...basePayment, id: uuidv4(), status: "pending", paidAt: null };
    const result = await createPayment(pending);
    expect(result.status).toBe("pending");
    expect(result.paid_at).toBe(null);
  });

  it("should accept paidAt only if status is 'paid'", async () => {
    const paid = {
      ...basePayment,
      id: uuidv4(),
      status: "paid",
      paidAt: new Date("2025-11-02"),
    };
    const result = await createPayment(paid);
    expect(result.status).toBe("paid");
    expectDateEqual(result.paid_at, paid.paidAt);
  });

  it("should reject paidAt if status is not 'paid'", async () => {
    const invalid = {
      ...basePayment,
      id: uuidv4(),
      status: "pending",
      paidAt: new Date("2025-11-02"),
    };
    await expectErrorCode(
      createPayment(invalid),
      PaymentErrors.CREATE.INVALID_DATA.code
    );
  });

it("should assign default dueDate at least one month ahead if missing", async () => {
  const input = {
    ...basePayment,
    id: uuidv4(),
  };
  delete input.dueDate; // omitido a propósito

  const result = await createPayment(input);

  const now = new Date();
  const minDueDate = new Date(now);
  minDueDate.setMonth(minDueDate.getMonth() + 1);

const resultDate = new Date(result.due_date);
expect(resultDate.getFullYear()).toBeGreaterThanOrEqual(minDueDate.getFullYear());
expect(resultDate.getMonth()).toBeGreaterThanOrEqual(minDueDate.getMonth());
});


});
