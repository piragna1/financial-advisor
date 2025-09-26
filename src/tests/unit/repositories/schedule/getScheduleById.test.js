import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";
import {
  createSchedule,
  getScheduleById
} from "../../../../repositories/scheduleRepository.js";
import { createMockLoan } from "../../../../actors/loan/createMockLoan.js";
import { ScheduleErrors } from "../../../../errors/scheduleErrors.js";

describe("getScheduleById(id)", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.end();
  });

  it("should return the schedule for a valid id", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);
    await createSchedule({
      id, loanId, plan: "weekly",
      startDate: "2025-08-01",
      totalAmount: 800,
      currency: "USD",
      installments: 8
    });

    const result = await getScheduleById(id);
    expect(result.id).toBe(id);
    expect(result.loan_id).toBe(loanId);
  });

  it("should throw INVALID_ID for null, undefined, empty or non-string id", async () => {
    await expect(getScheduleById(null)).rejects.toMatchObject({
      code: ScheduleErrors.READ.INVALID_ID
    });
    await expect(getScheduleById("")).rejects.toMatchObject({
      code: ScheduleErrors.READ.INVALID_ID
    });
    await expect(getScheduleById(123)).rejects.toMatchObject({
      code: ScheduleErrors.READ.INVALID_ID
    });
  });

  it("should throw NOT_FOUND if schedule does not exist", async () => {
    await expect(getScheduleById(uuidv4())).rejects.toMatchObject({
      code: ScheduleErrors.READ.NOT_FOUND
    });
  });

  it("should return trimmed id match", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);
    await createSchedule({
      id, loanId, plan: "monthly",
      startDate: "2025-07-15",
      totalAmount: 1200,
      currency: "EUR",
      installments: 6
    });
    const result = await getScheduleById(`  ${id}  `);
    expect(result.id).toBe(id);
  });
});
