import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";
import { deleteSchedule } from "../../../../repositories/scheduleRepository.js";
import { createMockScheduleChain } from "../../../../actors/schedule/createMockScheduleChain.js";
import { ScheduleErrors } from "../../../../errors/scheduleErrors.js";
import { expectErrorCode } from "../../../helpers/testHelpers.js";

describe("deleteSchedule(id)", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
    await pool.query("DELETE FROM users;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
    await pool.query("DELETE FROM users;");
    await pool.end();
  });

  it("should delete the schedule and return it", async () => {
    const id = uuidv4();
    await createMockScheduleChain({
      id,
      plan: "monthly",
      startDate: "2025-03-01",
      totalAmount: 400,
      currency: "USD",
      installments: 4
    });

    const result = await deleteSchedule(id);
    expect(result.id).toBe(id);

    const check = await pool.query("SELECT * FROM schedules WHERE id = $1", [id]);
    expect(check.rowCount).toBe(0);
  });

  it("should throw INVALID_ID for null, undefined, empty, non-string, or malformed UUID", async () => {
    await expectErrorCode(deleteSchedule(null), ScheduleErrors.DELETE.INVALID_ID.code);
    await expectErrorCode(deleteSchedule(""), ScheduleErrors.DELETE.INVALID_ID.code);
    await expectErrorCode(deleteSchedule(123), ScheduleErrors.DELETE.INVALID_ID.code);
    await expectErrorCode(deleteSchedule("not-a-uuid"), ScheduleErrors.DELETE.INVALID_ID.code);
  });

  it("should throw NOT_FOUND if schedule does not exist", async () => {
    await expectErrorCode(deleteSchedule(uuidv4()), ScheduleErrors.DELETE.NOT_FOUND.code);
  });

  it("should not affect other schedules", async () => {
    const idA = uuidv4();
    const idB = uuidv4();

    await createMockScheduleChain({ id: idA });
    await createMockScheduleChain({ id: idB });

    await deleteSchedule(idA);

    const remaining = await pool.query("SELECT * FROM schedules WHERE id = $1", [idB]);
    expect(remaining.rowCount).toBe(1);
    expect(remaining.rows[0].id).toBe(idB);
  });

  it("should not delete the loan or financial profile", async () => {
  const { schedule, loan, financialProfile, user } = await createMockScheduleChain();

  await deleteSchedule(schedule.id);

  const loanCheck = await pool.query("SELECT * FROM loans WHERE id = $1", [loan.id]);
  expect(loanCheck.rowCount).toBe(1);

  const profileCheck = await pool.query("SELECT * FROM financial_profiles WHERE id = $1", [financialProfile.id]);
  expect(profileCheck.rowCount).toBe(1);

  const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [user.id]);
  expect(userCheck.rowCount).toBe(1);
});


  it("should trim the id before deletion", async () => {
    const id = uuidv4();
    await createMockScheduleChain({ id });

    const result = await deleteSchedule(`   ${id}   `);
    expect(result.id).toBe(id);

    const check = await pool.query("SELECT * FROM schedules WHERE id = $1", [id]);
    expect(check.rowCount).toBe(0);
  });

  it("should throw NOT_FOUND if schedule was already deleted", async () => {
    const id = uuidv4();
    await createMockScheduleChain({ id });
    await deleteSchedule(id);

    await expectErrorCode(deleteSchedule(id), ScheduleErrors.DELETE.NOT_FOUND.code);
  });
});
