import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";

import { createSchedule } from "../../../../repositories/scheduleRepository.js";
import { createMockFinancialProfile } from "../../../../actors/financialProfile/createMockFinancialProfile.js";
import { createMockLoan } from "../../../../actors/loan/createMockLoan.js";
import {createMockUser} from '../../../../actors/users/createMockUser.js'
import { ScheduleErrors } from "../../../../errors/scheduleErrors.js";

import {
  expectDateEqual,
  expectNumericEqual,
  expectScheduleMatch,
  expectErrorCode,
  utcDate,
} from "../../../helpers/testHelpers.js";

describe("createSchedule(schedule) — exhaustive suite", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM schedules;");
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
  });

  async function validBase() {
    const fp    = await createMockFinancialProfile();
    const loanId= uuidv4();
    await createMockLoan(loanId, fp.id);
    return { loanId };
  }

  it("creates a valid schedule with trimmed string fields", async () => {
    const { loanId } = await validBase();

    const input = {
      id: `  ${uuidv4()}  `,
      loanId: `  ${loanId}  `,
      plan: "monthly",
      startDate: new Date(),
      totalAmount: 5000,
      currency: " USD ",
      installments: 12,
      extra: "ignored",
    };

    const result = await createSchedule(input);

    expect(result.id).toBe(input.id.trim());
    expect(result.loan_id).toBe(loanId);

    expectScheduleMatch(result, {
      loanId,
      plan: "monthly",
      startDate: "2025-09-26",
      totalAmount: 5000,
      currency: "USD",
      installments: 12,
    });

    expect(result).not.toHaveProperty("extra");
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it("accepts startDate as a Date object", async () => {
    const { loanId } = await validBase();
    const input = {
      id: uuidv4(),
      loanId,
      plan: "monthly",
      startDate: new Date(),
      totalAmount: 1500,
      currency: "USD",
      installments: 6,
    };

    const result = await createSchedule(input);
    expectDateEqual(result.start_date, "2025-09-26");
  });

  it("rejects non-object input", async () => {
    await expectErrorCode(createSchedule(null), ScheduleErrors.CREATE.INVALID_INPUT.code);
    await expectErrorCode(createSchedule("string"), ScheduleErrors.CREATE.INVALID_INPUT.code);
    await expectErrorCode(createSchedule(123), ScheduleErrors.CREATE.INVALID_INPUT.code);
  });

  it("rejects missing or invalid id", async () => {
    const { loanId } = await validBase();
    const base = {
      loanId,
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule({ ...base, id: null }), ScheduleErrors.CREATE.INVALID_ID.code);
    await expectErrorCode(createSchedule({ ...base, id: "" }), ScheduleErrors.CREATE.INVALID_ID.code);
    await expectErrorCode(createSchedule({ ...base, id: 42 }), ScheduleErrors.CREATE.INVALID_ID.code);
  });

  it("rejects missing or invalid loanId", async () => {
    const base = {
      id: uuidv4(),
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule({ ...base, loanId: null }), ScheduleErrors.CREATE.INVALID_LOAN_ID.code);
    await expectErrorCode(createSchedule({ ...base, loanId: "" }), ScheduleErrors.CREATE.INVALID_LOAN_ID.code);
    await expectErrorCode(createSchedule({ ...base, loanId: 42 }), ScheduleErrors.CREATE.INVALID_LOAN_ID.code);
  });

  it("rejects unsupported plan values", async () => {
    const { loanId } = await validBase();
    const input = {
      id: uuidv4(),
      loanId,
      plan: "Daily",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule(input), ScheduleErrors.CREATE.INVALID_PLAN.code);
  });

  it("rejects invalid startDate formats", async () => {
    const { loanId } = await validBase();
    const input = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: "not-a-date",
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule(input), ScheduleErrors.CREATE.INVALID_START_DATE.code);
  });

  it("rejects totalAmount ≤ 0 or non-numeric", async () => {
    const { loanId } = await validBase();
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule({ ...base, totalAmount: 0 }), ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT.code);
    await expectErrorCode(createSchedule({ ...base, totalAmount: "1000" }), ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT.code);
    await expectErrorCode(createSchedule({ ...base, totalAmount: -10 }), ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT.code);
  });

  it("rejects missing or invalid currency", async () => {
    const { loanId } = await validBase();
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      installments: 4,
    };

    await expectErrorCode(createSchedule({ ...base, currency: null }), ScheduleErrors.CREATE.INVALID_CURRENCY.code);
    await expectErrorCode(createSchedule({ ...base, currency: "" }), ScheduleErrors.CREATE.INVALID_CURRENCY.code);
    await expectErrorCode(createSchedule({ ...base, currency: 123 }), ScheduleErrors.CREATE.INVALID_CURRENCY.code);
  });

  it("rejects installments ≤ 0 or non-numeric", async () => {
    const { loanId } = await validBase();
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      currency: "USD",
    };

    await expectErrorCode(createSchedule({ ...base, installments: 0 }), ScheduleErrors.CREATE.INVALID_INSTALLMENTS.code);
    await expectErrorCode(createSchedule({ ...base, installments: "4" }), ScheduleErrors.CREATE.INVALID_INSTALLMENTS.code);
    await expectErrorCode(createSchedule({ ...base, installments: -1 }), ScheduleErrors.CREATE.INVALID_INSTALLMENTS.code);
  });

  it("rejects loanId that does not exist (foreign key)", async () => {
    const input = {
      id: uuidv4(),
      loanId: uuidv4(),
      plan: "monthly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 5000,
      currency: "USD",
      installments: 12,
    };

    await expect(createSchedule(input)).rejects.toThrow(/foreign key constraint/i);
  });

  it("rejects duplicate schedule id", async () => {
    const { loanId } = await validBase();
    const id    = uuidv4();
    const input = {
      id,
      loanId,
      plan: "monthly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 5000,
      currency: "USD",
      installments: 12,
    };

    await createSchedule(input);
    await expect(createSchedule(input)).rejects.toThrow(/duplicate key value violates unique constraint/i);
  });

  it("accepts extreme but valid values", async () => {

    const user = await createMockUser(uuidv4());
    const financial = await createMockFinancialProfile({userId:user.id});
    const loan = await createMockLoan(financial.id);


    const input = {
      id: uuidv4(),
      loanId: loan.id,
      plan: "custom",
      startDate: utcDate("2030-01-01"),
      totalAmount: 9999999999,
      currency: "JPY",
      installments: 360,
    };

    const result = await createSchedule(input);
    expectNumericEqual(result.total_amount, 9999999999);
    expect(result.installments).toBe(360);
    expect(result.currency).toBe("JPY");
  });
});
