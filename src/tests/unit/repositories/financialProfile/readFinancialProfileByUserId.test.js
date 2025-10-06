import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  createFinancialProfile,
  getFinancialProfileByUserId
} from "../../../../repositories/financialProfileRepository.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("getFinancialProfileByUserId(userId)", () => {

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should return the financial profile if userId exists", async () => {
    const baseUser = await createMockUser(uuidv4());
    
  const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 75000,
    createdAt: new Date(),
    updatedAt: null
  };
    await createFinancialProfile(baseProfile);
    const result = await getFinancialProfileByUserId(baseProfile.userId);

    expect(result.id).toBe(baseProfile.id);
    expect(result.user_id).toBe(baseProfile.userId);
    expect(Number(result.salary)).toBe(baseProfile.salary);
  });

  it("should throw NOT_FOUND if userId does not exist", async () => {
    const fakeUserId = uuidv4();
    await expect(getFinancialProfileByUserId(fakeUserId)).rejects.toMatchObject({
      code: "FINANCIAL_READ_NOT_FOUND"
    });
  });

  it("should throw INVALID_ID if userId is null", async () => {
    await expect(getFinancialProfileByUserId(null)).rejects.toMatchObject({
      code: "FINANCIAL_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is undefined", async () => {
    await expect(getFinancialProfileByUserId(undefined)).rejects.toMatchObject({
      code: "FINANCIAL_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is a number", async () => {
    await expect(getFinancialProfileByUserId(123)).rejects.toMatchObject({
      code: "FINANCIAL_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is an object", async () => {
    const baseUser = await createMockUser(uuidv4());
    
  const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 75000,
    createdAt: new Date(),
    updatedAt: null
  };
    await expect(getFinancialProfileByUserId({ id: baseProfile.userId })).rejects.toMatchObject({
      code: "FINANCIAL_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is an array", async () => {
    const baseUser = await createMockUser(uuidv4());
    
  const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 75000,
    createdAt: new Date(),
    updatedAt: null
  };
    await expect(getFinancialProfileByUserId([baseProfile.userId])).rejects.toMatchObject({

      code: "FINANCIAL_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is empty string", async () => {
    await expect(getFinancialProfileByUserId("")).rejects.toMatchObject({
      code: "FINANCIAL_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is whitespace only", async () => {
    await expect(getFinancialProfileByUserId("   ")).rejects.toMatchObject({
      code: "FINANCIAL_READ_INVALID_ID"
    });
  });

  it("should trim userId before querying", async () => {
    const baseUser = await createMockUser(uuidv4());
  const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 75000,
    createdAt: new Date(),
    updatedAt: null
  };
    await createFinancialProfile(baseProfile);
    const result = await getFinancialProfileByUserId(`  ${baseProfile.userId}  `);
    expect(result.user_id).toBe(baseProfile.userId);
  });
});
