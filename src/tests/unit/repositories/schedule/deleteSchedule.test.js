import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../db/pool.js";
import {
  createSchedule,
  deleteSchedule
} from "../../../repositories/scheduleRepository.js";
import { createMockLoan } from "../../../actors/loans/createMockLoan.js";
import { ScheduleErrors } from "../../../errors/scheduleErrors.js";

describe("deleteSchedule(id)", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.end();
  });

  it("should delete the schedule and return it", async () => {
    const loanId = uuidv4();
    const id = uuidv4();
    await createMockLoan(loanId);

    await createSchedule({
      id,
      loanId,
      plan: "monthly",
      startDate: "2025-03-01",
      totalAmount: 400,
      currency: "USD",
      installments: 4
    });

    const result = await deleteSchedule(id);
    expect(result.id).toBe(id);

    const check = await pool.query(
      "SELECT * FROM schedules WHERE id = $1",
      [id]
    );
    expect(check.rowCount).toBe(0);
  });

  it("should throw INVALID_ID for null, undefined, empty or non-string", async () => {
    await expect(deleteSchedule(null)).rejects.toMatchObject({
      code: ScheduleErrors.DELETE.INVALID_ID
    });
    await expect(deleteSchedule("")).rejects.toMatchObject({
      code: ScheduleErrors.DELETE.INVALID_ID
    });
    await expect(deleteSchedule(123)).rejects.toMatchObject({
      code: ScheduleErrors.DELETE.INVALID_ID
    });
  });

  it("should throw NOT_FOUND if schedule does not exist", async () => {
    await expect(deleteSchedule(uuidv4())).rejects.toMatchObject({
      code: ScheduleErrors.DELETE.NOT_FOUND
    });
  });

  it("should not affect other schedules", async () => {
    const loanA = uuidv4();
    const loanB = uuidv4();
    const idA = uuidv4();
    const idB = uuidv4();
    await createMockLoan(loanA);
    await createMockLoan(loanB);

    await createSchedule({
      id: idA,
      loanId: loanA,
      plan: "weekly",
      startDate: "2025-02-01",
      totalAmount: 200,
      currency: "EUR",
      installments: 2
    });
    await createSchedule({
      id: idB,
      loanId: loanB,
      plan: "custom",
      startDate: "2025-02-15",
      totalAmount: 300,
      currency: "GBP",
      installments: 3
    });

    await deleteSchedule(idA);

    const remaining = await pool.query(
      "SELECT * FROM schedules WHERE id = $1",
      [idB]
    );
    expect(remaining.rowCount).toBe(1);
    expect(remaining.rows[0].id).toBe(idB);
  });
});
