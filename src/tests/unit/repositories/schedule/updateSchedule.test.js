import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  createSchedule,
  updateSchedule,
} from "../../../../repositories/scheduleRepository.js";
import { createMockLoan } from "../../../../actors/loan/createMockLoan.js";
import { ScheduleErrors } from "../../../../errors/scheduleErrors.js";
import { createMockScheduleChain } from "../../../../actors/schedule/createMockScheduleChain.js";
import { expectDateEqual } from "../../../helpers/testHelpers.js";
import { expectErrorCode } from "../../../helpers/testHelpers.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("updateSchedule(schedule)", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
  });

  it("should update all editable fields", async () => {
    const id = uuidv4();
    const { schedule } = await createMockScheduleChain({
      id,
      plan: "custom",
      startDate: "2025-06-01",
      totalAmount: 2000,
      currency: "USD",
      installments: 10,
    });

    const updated = {
      id,
      plan: "monthly",
      startDate: "2025-06-15",
      totalAmount: 2500,
      currency: "GBP",
      installments: 5,
    };

    const result = await updateSchedule(updated);

    expect(result.plan).toBe("monthly");
    expect(Number(result.total_amount)).toBe(2500);
    expect(result.currency).toBe("GBP");
    expect(result.installments).toBe(5);
    expectDateEqual(result.start_date, "2025-06-15");
  });

  it("should allow partial updates (leave others unchanged)", async () => {
    const id = uuidv4();
    const { schedule } = await createMockScheduleChain({
      id,
      plan: "weekly",
      startDate: "2025-05-01",
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    });

    const result = await updateSchedule({
      id,
      totalAmount: 1100,
    });

    expect(Number(result.total_amount)).toBe(1100); // ← string por tipo NUMERIC
    expect(result.plan).toBe("weekly");
  });

  it("should throw INVALID_INPUT if schedule is not an object", async () => {
    await expectErrorCode(
      updateSchedule(null),
      ScheduleErrors.UPDATE.INVALID_INPUT
    );
  });

  it("should throw INVALID_ID if id is missing or invalid", async () => {
    const code = ScheduleErrors.UPDATE.INVALID_ID;

    await expectErrorCode(updateSchedule({}), code);
    await expectErrorCode(updateSchedule({ id: "" }), code);
  });

  it("should throw INVALID_PLAN for unsupported plan", async () => {
    const id = uuidv4();
    await createMockScheduleChain({
      id,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9,
    });

    await expectErrorCode(
      updateSchedule({ id, plan: "daily" }),
      ScheduleErrors.UPDATE.INVALID_PLAN
    );
  });

  it("should throw INVALID_START_DATE for invalid date", async () => {
    const id = uuidv4();
    await createMockScheduleChain({
      id,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9,
    });

    await expectErrorCode(
      updateSchedule({ id, startDate: "bad-date" }),
      ScheduleErrors.UPDATE.INVALID_START_DATE
    );
  });

  it("should throw INVALID_TOTAL_AMOUNT for non-number or ≤ 0", async () => {
    const id = uuidv4();
    await createMockScheduleChain({
      id,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9,
    });

    await expectErrorCode(
      updateSchedule({ id, totalAmount: "100" }),
      ScheduleErrors.UPDATE.INVALID_TOTAL_AMOUNT
    );

    await expectErrorCode(
      updateSchedule({ id, totalAmount: 0 }),
      ScheduleErrors.UPDATE.INVALID_TOTAL_AMOUNT
    );
  });

  it("should throw INVALID_CURRENCY for empty or non-string currency", async () => {
    const id = uuidv4();
    await createMockScheduleChain({
      id,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9,
    });

    await expectErrorCode(
      updateSchedule({ id, currency: "" }),
      ScheduleErrors.UPDATE.INVALID_CURRENCY
    );

    await expectErrorCode(
      updateSchedule({ id, currency: 123 }),
      ScheduleErrors.UPDATE.INVALID_CURRENCY
    );
  });

  it("should throw INVALID_INSTALLMENTS for non-number or ≤ 0", async () => {
    const id = uuidv4();
    await createMockScheduleChain({
      id,
      plan: "weekly",
      startDate: "2025-04-01",
      totalAmount: 900,
      currency: "USD",
      installments: 9,
    });

    await expectErrorCode(
      updateSchedule({ id, installments: 0 }),
      ScheduleErrors.UPDATE.INVALID_INSTALLMENTS
    );

    await expectErrorCode(
      updateSchedule({ id, installments: "5" }),
      ScheduleErrors.UPDATE.INVALID_INSTALLMENTS
    );
  });
  it("should throw NOT_FOUND if schedule does not exist", async () => {
    const id = uuidv4();
    await expectErrorCode(
      updateSchedule({ id, totalAmount: 100 }),
      ScheduleErrors.UPDATE.NOT_FOUND
    );
  });
});
