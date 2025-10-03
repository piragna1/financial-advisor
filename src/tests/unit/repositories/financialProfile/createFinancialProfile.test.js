import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import { createFinancialProfile } from "../../../../repositories/financialProfileRepository.js";
import {createMockUser} from '../../../../actors/users/createMockUser.js'

describe("createFinancialProfile(profile)", () => {

  beforeEach(async () => {
    await pool.query("DELETE FROM financial_profiles;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should create and return a valid financial profile", async () => {
    const baseUser = await createMockUser(uuidv4());
    const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 50000,
    createdAt: new Date(),
    updatedAt: null
  };
    const result = await createFinancialProfile(baseProfile);
    expect(result.id).toBe(baseProfile.id);
    expect(result.user_id).toBe(baseProfile.userId);
    expect(Number(result.salary)).toBe(baseProfile.salary);
  });

  it("should default createdAt if not provided", async () => {
    const baseUser = await createMockUser(uuidv4());
    const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 50000,
    createdAt: new Date(),
    updatedAt: null
  };
    const profile = { ...baseProfile, id: uuidv4(), createdAt: undefined };
    const result = await createFinancialProfile(profile);
    expect(result.created_at).toBeInstanceOf(Date);
  });

 

  it("should throw INVALID_INPUT if profile is null", async () => {
    await expect(createFinancialProfile(null)).rejects.toMatchObject({
      code: "FINANCIAL_CREATE_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if profile is not an object", async () => {
    await expect(createFinancialProfile("invalid")).rejects.toMatchObject({
      code: "FINANCIAL_CREATE_INVALID_INPUT"
    });
  });

  it("should throw INVALID_ID if id is missing", async () => {
    const baseUser = await createMockUser(uuidv4());
    const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 50000,
    createdAt: new Date(),
    updatedAt: null
  };
    const profile = { ...baseProfile, id: null };
    await expect(createFinancialProfile(profile)).rejects.toMatchObject({
      code: "FINANCIAL_CREATE_INVALID_ID"
    });
  });

  it("should throw INVALID_USER_ID if userId is missing", async () => {
    const baseUser = await createMockUser(uuidv4());
    const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 50000,
    createdAt: new Date(),
    updatedAt: null
  };
    const profile = { ...baseProfile, userId: null };
    await expect(createFinancialProfile(profile)).rejects.toMatchObject({
      code: "FINANCIAL_CREATE_INVALID_USER_ID"
    });
  });

  it("should throw INVALID_SALARY if salary is negative", async () => {
    const baseUser = await createMockUser(uuidv4());
    const baseProfile = {
    id: uuidv4(),
    userId: baseUser.id,
    salary: 50000,
    createdAt: new Date(),
    updatedAt: null
  };
    const profile = { ...baseProfile, salary: -1000 };
    await expect(createFinancialProfile(profile)).rejects.toMatchObject({
      code: "FINANCIAL_CREATE_INVALID_SALARY"
    });
  });

  it("should throw INVALID_SALARY if salary is not a number", async () => {
    const baseUser = await createMockUser(uuidv4());
    const baseProfile = {
    id: baseUser.id,
    userId: baseUser.id,
    salary: 50000,
    createdAt: new Date(),
    updatedAt: null
  };
    const profile = { ...baseProfile, salary: "not-a-number", userId:baseUser.id };
    await expect(createFinancialProfile(profile)).rejects.toMatchObject({
      code: "FINANCIAL_CREATE_INVALID_SALARY"
    });
  });

  it("should persist and retrieve the same profile", async () => {
    const baseUser = await createMockUser(uuidv4());
    const baseProfile = {
    id: baseUser.id,
    userId: baseUser.id,
    salary: 50000,
    createdAt: new Date(),
    updatedAt: null
  };
    console.log('should persist and retrieve the same profile')
    console.log(baseProfile)
    const saved = await createFinancialProfile(baseProfile);
    const query = `SELECT * FROM financial_profiles WHERE id = $1`;
    const result = await pool.query(query, [baseProfile.id]);
    expect(result.rows[0].id).toBe(baseProfile.id);
    expect(result.rows[0].user_id).toBe(baseProfile.userId);
    expect(Number(result.rows[0].salary)).toBe(baseProfile.salary);
  });
});
