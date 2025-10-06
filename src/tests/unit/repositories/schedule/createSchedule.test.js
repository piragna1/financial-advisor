import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";

import { createSchedule } from "../../../../repositories/scheduleRepository.js";
import { createMockFinancialProfile } from "../../../../actors/financialProfile/createMockFinancialProfile.js";
import { createMockLoan } from "../../../../actors/loan/createMockLoan.js";
import {createMockUser} from '../../../../actors/users/createMockUser.js'
import { ScheduleErrors } from "../../../../errors/scheduleErrors.js";
import {} from '../../../../actors/schedule/createMockScheduleChain.js'
import { resetDatabase } from "../../../helpers/resetDatabase.js";

import {
  expectDateEqual,
  expectNumericEqual,
  expectScheduleMatch,
  expectErrorCode,
  utcDate,
} from "../../../helpers/testHelpers.js";

describe("createSchedule(schedule) — exhaustive suite", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
  });

  async function validBase(userId) {

    console.log('validBase() userId', userId)

    const fp    = await createMockFinancialProfile({userId});

    const loanId= uuidv4();
    await createMockLoan(loanId, fp.id);
    return { loanId };
  }

  it("creates a valid schedule with trimmed string fields", async () => {

    console.log('creates a valid schedule with trimmed string fields')

    const baseUser = await createMockUser(uuidv4());
    const { loanId } = await validBase(baseUser.id);

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
      startDate: new Date(),
      totalAmount: 5000,
      currency: "USD",
      installments: 12,
    });

    expect(result).not.toHaveProperty("extra");
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it("accepts startDate as a Date object", async () => {
    const baseUser = await createMockUser(uuidv4());
    const { loanId } = await validBase(baseUser.id);
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
    expectDateEqual(result.start_date, new Date());
  });

  it("rejects non-object input", async () => {
    await expectErrorCode(createSchedule(null), ScheduleErrors.CREATE.INVALID_INPUT);
    await expectErrorCode(createSchedule("string"), ScheduleErrors.CREATE.INVALID_INPUT);
    await expectErrorCode(createSchedule(123), ScheduleErrors.CREATE.INVALID_INPUT);
  });

  it("rejects missing or invalid id", async () => {

    console.log('rejects missing or invalid ')

    const baseUser = await createMockUser(uuidv4());
    const { loanId } = await validBase(baseUser.id);
    const base = {
      loanId,
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule({ ...base, id: null }), ScheduleErrors.CREATE.INVALID_ID);
    await expectErrorCode( createSchedule({ ...base, id: "" }), ScheduleErrors.CREATE.INVALID_ID);
    await expectErrorCode( createSchedule({ ...base, id: 42 }), ScheduleErrors.CREATE.INVALID_ID);
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

    await expectErrorCode(createSchedule({ ...base, loanId: null }), ScheduleErrors.CREATE.INVALID_LOAN_ID);
    await expectErrorCode(createSchedule({ ...base, loanId: "" }), ScheduleErrors.CREATE.INVALID_LOAN_ID);
    await expectErrorCode(createSchedule({ ...base, loanId: 42 }), ScheduleErrors.CREATE.INVALID_LOAN_ID);
  });

  it("rejects unsupported plan values", async () => {
    const baseUser = await createMockUser(uuidv4());
    const { loanId } = await validBase(baseUser.id);
    const input = {
      id: uuidv4(),
      loanId,
      plan: "Daily",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule(input), ScheduleErrors.CREATE.INVALID_PLAN);
  });

  it("rejects invalid startDate formats", async () => {
    const baseUser = await createMockUser(uuidv4());
    const { loanId } = await validBase(baseUser.id);
    const input = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: "not-a-date",
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule(input), ScheduleErrors.CREATE.INVALID_START_DATE);
  });

  it("rejects totalAmount ≤ 0 or non-numeric", async () => {
    const baseUser = await createMockUser(uuidv4());
    const { loanId } = await validBase(baseUser.id);
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      currency: "USD",
      installments: 4,
    };

    await expectErrorCode(createSchedule({ ...base, totalAmount: 0 }), ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT);
    await expectErrorCode(createSchedule({ ...base, totalAmount: "1000" }), ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT);
    await expectErrorCode(createSchedule({ ...base, totalAmount: -10 }), ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT);
  });

  it("rejects missing or invalid currency", async () => {
    const baseUser = await createMockUser(uuidv4());
    const { loanId } = await validBase(baseUser.id);
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      installments: 4,
    };

    await expectErrorCode(createSchedule({ ...base, currency: null }), ScheduleErrors.CREATE.INVALID_CURRENCY);
    await expectErrorCode(createSchedule({ ...base, currency: "" }), ScheduleErrors.CREATE.INVALID_CURRENCY);
    await expectErrorCode(createSchedule({ ...base, currency: 123 }), ScheduleErrors.CREATE.INVALID_CURRENCY);
  });

  it("rejects installments ≤ 0 or non-numeric", async () => {

    console.log('rejects installments ≤ 0 or non-numeric')

    const baseUser = await createMockUser(uuidv4());

    const { loanId } = await validBase(baseUser.id);

    console.log('loanId', loanId)

    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: utcDate("2025-10-01"),
      totalAmount: 1000,
      currency: "USD",
    };
    
    await expectErrorCode(createSchedule({ ...base, installments: 0 }), ScheduleErrors.CREATE.INVALID_INSTALLMENTS);
    await expectErrorCode(createSchedule({ ...base, installments: "4" }), ScheduleErrors.CREATE.INVALID_INSTALLMENTS);
    await expectErrorCode(createSchedule({ ...base, installments: -1 }), ScheduleErrors.CREATE.INVALID_INSTALLMENTS);
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
    
    const user = await createMockUser(uuidv4());

    console.log('user', user);

    const financialProfile = await createMockFinancialProfile({userId:user.id});
    const loan = await createMockLoan(uuidv4(), financialProfile.id);
    const input = {
      id:uuidv4(),
      loanId:loan.id,
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
    const loanId = uuidv4();
    const loan = await createMockLoan(loanId,financial.id);


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
