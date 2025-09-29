import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";
import {
  createFinancialProfile,
  updateFinancialProfile
} from "../../../repositories/financialProfileRepository.js";

describe("updateFinancialProfile(id, updates)", () => {
  const baseProfile = {
    id: uuidv4(),
    userId: uuidv4(),
    salary: 60000,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    await pool.query("DELETE FROM financial_profiles;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should update salary and return updated profile", async () => {
    await createFinancialProfile(baseProfile);
    const result = await updateFinancialProfile(baseProfile.id, { salary: 75000 });
    expect(result.salary).toBe(75000);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it("should throw NOT_FOUND if ID does not exist", async () => {
    const fakeId = uuidv4();
    await expect(updateFinancialProfile(fakeId, { salary: 80000 })).rejects.toMatchObject({
      code: "FINANCIAL_UPDATE_NOT_FOUND"
    });
  });

  it("should throw INVALID_ID if ID is null", async () => {
    await expect(updateFinancialProfile(null, { salary: 80000 })).rejects.toMatchObject({
      code: "FINANCIAL_UPDATE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if ID is empty string", async () => {
    await expect(updateFinancialProfile("", { salary: 80000 })).rejects.toMatchObject({
      code: "FINANCIAL_UPDATE_INVALID_ID"
    });
  });

  it("should throw INVALID_INPUT if updates is null", async () => {
    await expect(updateFinancialProfile(baseProfile.id, null)).rejects.toMatchObject({
      code: "FINANCIAL_UPDATE_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if updates is not an object", async () => {
    await expect(updateFinancialProfile(baseProfile.id, "invalid")).rejects.toMatchObject({
      code: "FINANCIAL_UPDATE_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if updates is an array", async () => {
    await expect(updateFinancialProfile(baseProfile.id, ["salary"])).rejects.toMatchObject({
      code: "FINANCIAL_UPDATE_INVALID_INPUT"
    });
  });

  it("should throw NO_VALID_FIELDS if updates has no valid fields", async () => {
    await expect(updateFinancialProfile(baseProfile.id, { foo: "bar" })).rejects.toMatchObject({
      code: "FINANCIAL_UPDATE_NO_VALID_FIELDS"
    });
  });

  it("should trim ID before updating", async () => {
    await createFinancialProfile(baseProfile);
    const result = await updateFinancialProfile(`  ${baseProfile.id}  `, { salary: 90000 });
    expect(result.salary).toBe(90000);
  });
});
