import { createFinancialProfile } from "../../../src/repositories/financialProfileRepo.js";
import { AppError } from "../../../src/errors/AppError.js";
import { FinancialErrors } from "../../../src/errors/financialProfileErrors.js";

jest.mock("../../../src/db/pool.mjs", () => ({
  pool: {
    query: jest.fn(),
  },
}));

const { pool } = require("../../../src/db/pool.mjs");

describe("createFinancialProfile(profile)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("inserts and returns the financial profile", async () => {
    const profile = {
      id: "fp-001",
      userId: "user-001",
      salary: 120000,
      createdAt: new Date("2025-10-01"),
      updatedAt: new Date("2025-10-01"),
    };

    pool.query.mockResolvedValueOnce({
      rows: [profile],
      rowCount: 1,
    });

    const result = await createFinancialProfile(profile);
    expect(pool.query).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject(profile);
  });

  it("throws INVALID_INPUT if profile is not an object", async () => {
    await expect(createFinancialProfile(null)).rejects.toThrow(AppError);
    await expect(createFinancialProfile(null)).rejects.toMatchObject({
      code: FinancialErrors.CREATE.INVALID_INPUT.code,
    });
  });

  it("throws INVALID_ID if id is missing or invalid", async () => {
    const profile = {
      userId: "user-001",
      salary: 100000,
    };

    await expect(createFinancialProfile(profile)).rejects.toMatchObject({
      code: FinancialErrors.CREATE.INVALID_ID.code,
    });
  });

  it("throws INVALID_USER_ID if userId is missing or invalid", async () => {
    const profile = {
      id: "fp-002",
      salary: 100000,
    };

    await expect(createFinancialProfile(profile)).rejects.toMatchObject({
      code: FinancialErrors.CREATE.INVALID_USER_ID.code,
    });
  });

  it("throws INVALID_SALARY if salary is missing or invalid", async () => {
    const profile = {
      id: "fp-003",
      userId: "user-003",
      salary: -500,
    };

    await expect(createFinancialProfile(profile)).rejects.toMatchObject({
      code: FinancialErrors.CREATE.INVALID_SALARY.code,
    });
  });
});