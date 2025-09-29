import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../db/pool.js";
import {
  createFinancialProfile,
  deleteFinancialProfile
} from "../../../repositories/financialProfileRepository.js";

describe("deleteFinancialProfile(id)", () => {
  const baseProfile = {
    id: uuidv4(),
    userId: uuidv4(),
    salary: 70000,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    await pool.query("DELETE FROM financial_profiles;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should delete the profile and return it", async () => {
    await createFinancialProfile(baseProfile);
    const result = await deleteFinancialProfile(baseProfile.id);
    expect(result).toMatchObject({
      id: baseProfile.id,
      user_id: baseProfile.userId,
      salary: baseProfile.salary
    });

    const check = await pool.query("SELECT * FROM financial_profiles WHERE id = $1", [baseProfile.id]);
    expect(check.rowCount).toBe(0);
  });

  it("should throw NOT_FOUND if ID does not exist", async () => {
    const fakeId = uuidv4();
    await expect(deleteFinancialProfile(fakeId)).rejects.toMatchObject({
      code: "FINANCIAL_DELETE_NOT_FOUND"
    });
  });

  it("should throw INVALID_ID if ID is null", async () => {
    await expect(deleteFinancialProfile(null)).rejects.toMatchObject({
      code: "FINANCIAL_DELETE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if ID is empty string", async () => {
    await expect(deleteFinancialProfile("")).rejects.toMatchObject({
      code: "FINANCIAL_DELETE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if ID is whitespace only", async () => {
    await expect(deleteFinancialProfile("   ")).rejects.toMatchObject({
      code: "FINANCIAL_DELETE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if ID is a number", async () => {
    await expect(deleteFinancialProfile(123)).rejects.toMatchObject({
      code: "FINANCIAL_DELETE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if ID is an object", async () => {
    await expect(deleteFinancialProfile({ id: baseProfile.id })).rejects.toMatchObject({
      code: "FINANCIAL_DELETE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if ID is an array", async () => {
    await expect(deleteFinancialProfile([baseProfile.id])).rejects.toMatchObject({
      code: "FINANCIAL_DELETE_INVALID_ID"
    });
  });

  it("should trim ID before deleting", async () => {
    await createFinancialProfile(baseProfile);
    const result = await deleteFinancialProfile(`  ${baseProfile.id}  `);
    expect(result.id).toBe(baseProfile.id);
  });
});
