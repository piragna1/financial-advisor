import { saveLoan, getLoanById } from "../../../../repositories/loanRepository.js";
import { createMockFinancialProfile } from "../../../../actors/financialProfile/createMockFinancialProfile.js";
import { generateValidLoan } from "../../../../actors/loan/generateValidLoan.js";
import { pool } from "../../../../db/pool.mjs";
import { v4 as uuidv4 } from "uuid";
import { createMockUser } from "../../../../actors/users/createMockUser.js";

describe("getLoanById() — robust validation", () => {
  let baseUser,financialProfile;
  let savedLoan;

  beforeAll(async () => {
    baseUser = await createMockUser(uuidv4());
    financialProfile = await createMockFinancialProfile({userId:baseUser.id});
    const loanData = generateValidLoan(financialProfile.id);
    savedLoan = await saveLoan(loanData);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should return loan when ID exists", async () => {
    const loan = await getLoanById(savedLoan.id);
    expect(loan).not.toBeNull();
    expect(loan.id).toBe(savedLoan.id);
  });

  it("should return null when ID does not exist", async () => {
    const loan = await getLoanById(uuidv4());
    expect(loan).toBeNull();
  });

  it("should throw error when ID is null", async () => {
    await expect(() => getLoanById(null)).rejects.toThrow("Invalid loan id");
  });

  it("should throw error when ID is empty string", async () => {
    await expect(() => getLoanById("")).rejects.toThrow("Invalid loan id");
  });

  it("should throw error when ID is a number", async () => {
    await expect(() => getLoanById(123)).rejects.toThrow("Invalid loan id");
  });

  it("should throw error when ID is an object", async () => {
    await expect(() => getLoanById({})).rejects.toThrow("Invalid loan id");
  });

  it("should throw error when ID is an array", async () => {
    await expect(() => getLoanById([])).rejects.toThrow("Invalid loan id");
  });

  it("should throw error when ID is a boolean", async () => {
    await expect(() => getLoanById(true)).rejects.toThrow("Invalid loan id");
  });

  it("should throw error when ID is a Date object", async () => {
    await expect(() => getLoanById(new Date())).rejects.toThrow("Invalid loan id");
  });

  it("should throw error when ID is a UUID with spaces", async () => {
    const malformedId = uuidv4().replace(/-/g, " ");
    await expect(() => getLoanById(malformedId)).rejects.toThrow();
  });
});
