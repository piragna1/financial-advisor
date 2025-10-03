import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  createSchedule,
  getScheduleById,
} from "../../../../repositories/scheduleRepository.js";
import { createMockLoan } from "../../../../actors/loan/createMockLoan.js";
import { ScheduleErrors } from "../../../../errors/scheduleErrors.js";
import { createMockScheduleChain } from "../../../../actors/schedule/createMockScheduleChain.js";
import { expectErrorCode } from "../../../helpers/testHelpers.js";

describe("getScheduleById(id)", () => {
  beforeEach(async () => {
    resetDatabase();
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
  });

  it("should return the schedule for a valid id", async () => {
    const { schedule, loanId } = await createMockScheduleChain();
    const result = await getScheduleById(schedule.id);
    expect(result.id).toBe(schedule.id);
    expect(result.loan_id).toBe(loanId);
  });

 it("should throw INVALID_ID for null, undefined, empty or non-string id", async () => {
  const code = ScheduleErrors.READ.INVALID_ID;

  await expectErrorCode(getScheduleById(null), code);
  await expectErrorCode(getScheduleById(""), code);
  await expectErrorCode(getScheduleById(undefined), code);
  await expectErrorCode(getScheduleById(123), code);
});


  it("should throw NOT_FOUND if schedule does not exist", async () => {
  const expectedCode = ScheduleErrors.READ.NOT_FOUND;
  await expectErrorCode(getScheduleById(uuidv4()), expectedCode);
});


 it("should return trimmed id match", async () => {
  const rawId = uuidv4();
  const paddedId = `   ${rawId}   `;

  const { schedule } = await createMockScheduleChain({ id: rawId });
  const result = await getScheduleById(paddedId);

  expect(result.id).toBe(rawId);
});
});
