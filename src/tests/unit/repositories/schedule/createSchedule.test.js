// src/tests/unit/repositories/schedule/createSchedule.test.js

import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";

import { createSchedule } from "../../../../repositories/scheduleRepository.js";
import { createMockFinancialProfile } from "../../../../actors/financialProfile/createMockFinancialProfile.js";
import { createMockLoan } from "../../../../actors/loan/createMockLoan.js";

import { ScheduleErrors } from "../../../../errors/scheduleErrors.js";

import {
  expectDateEqual,
  expectNumericEqual,
  expectScheduleMatch,
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
    await pool.end();
  });

  /**
   * Prepara un préstamo y perfil financiero válidos.
   * Devuelve: { loanId }
   */
  async function validBase() {
    const financialProfile = await createMockFinancialProfile();
    const loanId = uuidv4();
    await createMockLoan(loanId, financialProfile.id);
    return { loanId };
  }

  it("creates a valid schedule with trimmed string fields", async () => {
    const { loanId } = await validBase();
    const input = {
      id: `  ${uuidv4()}  `,
      loanId: `  ${loanId}  `,
      plan: "monthly",
      startDate: "2025-10-01",
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
      startDate: "2025-10-01",
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
    const dateObj = new Date("2025-12-25");
    const input = {
      id: uuidv4(),
      loanId,
      plan: "monthly",
      startDate: dateObj,
      totalAmount: 1500,
      currency: "USD",
      installments: 6,
    };

    const result = await createSchedule(input);
    expectDateEqual(result.start_date, "2025-12-25");
  });

  it("rejects non-object input", async () => {
    await expect(createSchedule(null)).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_INPUT,
    });
    await expect(createSchedule("string")).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_INPUT,
    });
    await expect(createSchedule(123)).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_INPUT,
    });
  });

  it("rejects missing or invalid id", async () => {
    const { loanId } = await validBase();
    const base = {
      loanId,
      plan: "weekly",
      startDate: "2025-10-01",
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expect(createSchedule({ ...base, id: null })).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_ID,
    });
    await expect(createSchedule({ ...base, id: "" })).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_ID,
    });
    await expect(createSchedule({ ...base, id: 42 })).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_ID,
    });
  });

  it("rejects missing or invalid loanId", async () => {
    const base = {
      id: uuidv4(),
      plan: "weekly",
      startDate: "2025-10-01",
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expect(
      createSchedule({ ...base, loanId: null })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_LOAN_ID,
    });
    await expect(createSchedule({ ...base, loanId: "" })).rejects.toMatchObject(
      {
        code: ScheduleErrors.CREATE.INVALID_LOAN_ID,
      }
    );
    await expect(createSchedule({ ...base, loanId: 42 })).rejects.toMatchObject(
      {
        code: ScheduleErrors.CREATE.INVALID_LOAN_ID,
      }
    );
  });

  it("rejects unsupported plan values", async () => {
    const { loanId } = await validBase();
    const input = {
      id: uuidv4(),
      loanId,
      plan: "Daily",
      startDate: "2025-10-01",
      totalAmount: 1000,
      currency: "USD",
      installments: 4,
    };

    await expect(createSchedule(input)).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_PLAN,
    });
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

    await expect(createSchedule(input)).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_START_DATE,
    });
  });

  it("rejects totalAmount ≤ 0 or non-numeric", async () => {
    const { loanId } = await validBase();
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: "2025-10-01",
      currency: "USD",
      installments: 4,
    };

    await expect(
      createSchedule({ ...base, totalAmount: 0 })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT,
    });
    await expect(
      createSchedule({ ...base, totalAmount: "1000" })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT,
    });
    await expect(
      createSchedule({ ...base, totalAmount: -10 })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_TOTAL_AMOUNT,
    });
  });

  it("rejects missing or invalid currency", async () => {
    const { loanId } = await validBase();
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: "2025-10-01",
      totalAmount: 1000,
      installments: 4,
    };

    await expect(
      createSchedule({ ...base, currency: null })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_CURRENCY,
    });
    await expect(
      createSchedule({ ...base, currency: "" })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_CURRENCY,
    });
    await expect(
      createSchedule({ ...base, currency: 123 })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_CURRENCY,
    });
  });

  it("rejects installments ≤ 0 or non-numeric", async () => {
    const { loanId } = await validBase();
    const base = {
      id: uuidv4(),
      loanId,
      plan: "weekly",
      startDate: "2025-10-01",
      totalAmount: 1000,
      currency: "USD",
    };

    await expect(
      createSchedule({ ...base, installments: 0 })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_INSTALLMENTS,
    });
    await expect(
      createSchedule({ ...base, installments: "4" })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_INSTALLMENTS,
    });
    await expect(
      createSchedule({ ...base, installments: -1 })
    ).rejects.toMatchObject({
      code: ScheduleErrors.CREATE.INVALID_INSTALLMENTS,
    });
  });

  it("rejects loanId that does not exist (foreign key)", async () => {
    const input = {
      id: uuidv4(),
      loanId: uuidv4(), // no existe
      plan: "monthly",
      startDate: "2025-10-01",
      totalAmount: 5000,
      currency: "USD",
      installments: 12,
    };

    await expect(createSchedule(input)).rejects.toThrow(
      /foreign key constraint/i
    );
  });

  it("rejects duplicate schedule id", async () => {
    const { loanId } = await validBase();
    const id = uuidv4();
    const input = {
      id,
      loanId,
      plan: "monthly",
      startDate: "2025-10-01",
      totalAmount: 5000,
      currency: "USD",
      installments: 12,
    };

    await createSchedule(input);
    await expect(createSchedule(input)).rejects.toThrow(
      /duplicate key value violates unique constraint/i
    );
  });

  it("accepts extreme but valid values", async () => {
    const { loanId } = await validBase();
    const input = {
      id: uuidv4(),
      loanId,
      plan: "custom",
      startDate: "2030-01-01",
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
