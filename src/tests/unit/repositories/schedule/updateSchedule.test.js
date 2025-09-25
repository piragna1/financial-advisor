import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../db/pool.js";
import {
  createSchedule,
  updateSchedule
} from "../../../repositories/scheduleRepository.js";
import { createMockLoan } from "../../../actors/loans/createMockLoan.js";
import { ScheduleErrors } from "../../../errors/scheduleErrors.js";

describe("updateSchedule(schedule)", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.end();
  });

  it("should update all editable fields", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);

    await createSchedule({
      id,
      loanId,
      plan: "custom",
      startDate: "2025-06-01",
      totalAmount: 2000,
      currency: "USD",
      installments: 10
    });

    const updated = {
      id,
      plan: "monthly",
      startDate: "2025-06-15",
      totalAmount: 2500,
      currency: "GBP",
      installments: 5
    };

    const result = await updateSchedule(updated);
    expect(result.plan).toBe("monthly");
    expect(result.total_amount).toBe(2500);
    expect(result.currency).toBe("GBP");
    expect(result.installments).toBe(5);
    expect(result.start_date.toISOString().slice(0, 10)).toBe("2025-06-15");
  });

  it("should allow partial updates (leave others unchanged)", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);

    await createSchedule({
      id,
      loanId,
      plan: "weekly",
      startDate: "2025-05-01",
      totalAmount: 1000,
      currency: "USD",
      installments: 4
    });

    const result = await updateSchedule({
      id,
      totalAmount: 1100
    });

    expect(result.total_amount).toBe(1100);
    expect(result.plan).toBe("weekly");
  });

  it("should throw INVALID_INPUT if schedule is not an object", async () => {
    await expect(updateSchedule(null)).rejects.toMatchObject({
      code: ScheduleErrors.UPDATE.INVALID_INPUT
    });
  });

  it("should throw INVALID_ID if id is missing or invalid", async () => {
    await expect(updateSchedule({})).rejects.toMatchObject({
      code: ScheduleErrors.UPDATE.INVALID_ID
    });
    await expect(updateSchedule({ id: "" })).rejects.toMatchObject({
      code: ScheduleErrors.UPDATE.INVALID_ID
    });
  });

  it("should throw INVALID_PLAN for unsupported plan", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);
    await createSchedule({
      id,
      loanId,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9
    });
    await expect(updateSchedule({ id, plan: "daily" })).rejects.toMatchObject({
      code: ScheduleErrors.UPDATE.INVALID_PLAN
    });
  });

  it("should throw INVALID_START_DATE for invalid date", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);
    await createSchedule({
      id,
      loanId,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9
    });
    await expect(updateSchedule({ id, startDate: "bad-date" })).rejects
      .toMatchObject({ code: ScheduleErrors.UPDATE.INVALID_START_DATE });
  });

  it("should throw INVALID_TOTAL_AMOUNT for non-number or ≤ 0", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);
    await createSchedule({
      id,
      loanId,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9
    });
    await expect(updateSchedule({ id, totalAmount: "100" })).rejects
      .toMatchObject({ code: ScheduleErrors.UPDATE.INVALID_TOTAL_AMOUNT });
    await expect(updateSchedule({ id, totalAmount: 0 })).rejects
      .toMatchObject({ code: ScheduleErrors.UPDATE.INVALID_TOTAL_AMOUNT });
  });

  it("should throw INVALID_CURRENCY for empty or non-string currency", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);
    await createSchedule({
      id,
      loanId,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9
    });
    await expect(updateSchedule({ id, currency: "" })).rejects
      .toMatchObject({ code: ScheduleErrors.UPDATE.INVALID_CURRENCY });
    await expect(updateSchedule({ id, currency: 123 })).rejects
      .toMatchObject({ code: ScheduleErrors.UPDATE.INVALID_CURRENCY });
  });

  it("should throw INVALID_INSTALLMENTS for non-number or ≤ 0", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);
    await createSchedule({
      id,
      loanId,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9
    });
    await expect(updateSchedule({ id, installments: 0 })).rejects
      .toMatchObject({ code: ScheduleErrors.UPDATE.INVALID_INSTALLMENTS });
    await expect(updateSchedule({ id, installments: "5" })).rejects
      .toMatchObject({ code: ScheduleErrors.UPDATE.INVALID_INSTALLMENTS });
  });

  it("should throw NOT_FOUND if schedule does not exist", async () => {
    const id = uuidv4();
    await expect(updateSchedule({ id, totalAmount: 100 })).rejects
      .toMatchObject({ code: ScheduleErrors.UPDATE.NOT_FOUND });
  });
});
