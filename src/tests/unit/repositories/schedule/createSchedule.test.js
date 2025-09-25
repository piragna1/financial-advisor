import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../db/pool.js";
import {
  createSchedule
} from "../../../repositories/scheduleRepository.js";
import { createMockLoan } from "../../../actors/loans/createMockLoan.js";
import { ScheduleErrors } from "../../../errors/scheduleErrors.js";

describe("createSchedule(schedule)", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.end();
  });

  it("should create and return a valid schedule", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);

    const input = {
      id,
      loanId,
      plan: "monthly",
      startDate: "2025-10-01",
      totalAmount: 5000,
      currency: "USD",
      installments: 12
    };

    const result = await createSchedule(input);

    expect(result).toMatchObject({
      id,
      loan_id: loanId,
      plan: "monthly",
      total_amount: 5000,
      currency: "USD",
      installments: 12
    });
    expect(result.start_date.toISOString().slice(0, 10)).toBe("2025-10-01");
    expect(result.created_at).toBeDefined();
    expect(result.updated_at).toBeDefined();
  });

  it("should trim string fields", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);

    const input = {
      id: `  ${id}  `,
      loanId: `  ${loanId}  `,
      plan: "weekly",
      startDate: "2025-11-15",
      totalAmount: 1000,
      currency: " EUR ",
      installments: 4
    };

    const result = await createSchedule(input);
    expect(result.id).toBe(id);
    expect(result.loan_id).toBe(loanId);
    expect(result.currency).toBe("EUR");
  });

  it("should throw INVALID_INPUT if schedule is not an object", async () => {
    await expect(createSchedule(null)).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_INPUT
    });
    await expect(createSchedule("string")).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_INPUT
    });
  });

  it("should throw INVALID_ID for null, undefined, empty or non-string id", async () => {
    await expect(createSchedule({ id: null })).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_ID
    });
    await expect(createSchedule({ id: "" })).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_ID
    });
    await expect(createSchedule({ id: 123 })).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_ID
    });
  });

  it("should throw INVALID_LOAN_ID if loanId is missing or invalid", async () => {
    const input = {
      id: uuidv4(),
      plan: "monthly",
      startDate: "2025-11-01",
      totalAmount: 2000,
      currency: "USD",
      installments: 6
    };
    await expect(createSchedule(input)).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_LOAN_ID
    });
  });

  it("should throw INVALID_PLAN for unsupported plan value", async () => {
    const loanId = uuidv4();
    await createMockLoan(loanId);
    const input = {
      id: uuidv4(),
      loanId,
      plan: "daily",
      startDate: "2025-12-01",
      totalAmount: 3000,
      currency: "USD",
      installments: 3
    };
    await expect(createSchedule(input)).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_PLAN
    });
  });

  it("should throw INVALID_START_DATE for invalid date", async () => {
    const loanId = uuidv4();
    await createMockLoan(loanId);
    const input = {
      id: uuidv4(),
      loanId,
      plan: "custom",
      startDate: "not-a-date",
      totalAmount: 1500,
      currency: "USD",
      installments: 5
    };
    await expect(createSchedule(input)).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_START_DATE
    });
  });

  it("should throw INVALID_TOTAL_AMOUNT for non-number or ≤ 0", async () => {
    const loanId = uuidv4();
    await createMockLoan(loanId);
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: "2025-09-01",
      currency: "USD",
      installments: 4
    };
    await expect(createSchedule({ ...base, totalAmount: "100" }))
      .rejects.toMatchObject({ code: ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT });
    await expect(createSchedule({ ...base, totalAmount: 0 }))
      .rejects.toMatchObject({ code: ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT });
  });

  it("should throw INVALID_CURRENCY for missing or empty currency", async () => {
    const loanId = uuidv4();
    await createMockLoan(loanId);
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: "2025-09-01",
      totalAmount: 1000,
      installments: 4
    };
    await expect(createSchedule({ ...base, currency: null }))
      .rejects.toMatchObject({ code: ScheduleErrors.CREATE.INVALID_CURRENCY });
    await expect(createSchedule({ ...base, currency: "" }))
      .rejects.toMatchObject({ code: ScheduleErrors.CREATE.INVALID_CURRENCY });
  });

  it("should throw INVALID_INSTALLMENTS for non-number or ≤ 0", async () => {
    const loanId = uuidv4();
    await createMockLoan(loanId);
    const base = {
      id: uuidv4(),
      loanId,
      plan: "monthly",
      startDate: "2025-09-01",
      totalAmount: 1000,
      currency: "USD"
    };
    await expect(createSchedule({ ...base, installments: "4" }))
      .rejects.toMatchObject({ code: ScheduleErrors.CREATE.INVALID_INSTALLMENTS });
    await expect(createSchedule({ ...base, installments: 0 }))
      .rejects.toMatchObject({ code: ScheduleErrors.CREATE.INVALID_INSTALLMENTS });
  });
});
