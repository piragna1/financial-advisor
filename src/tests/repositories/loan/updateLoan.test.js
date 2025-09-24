import { saveLoan, updateLoan, getLoanById } from "../../../repositories/loanRepository.js";
import { createMockFinancialProfile } from "../../../actors/financialProfile/createMockFinancialProfile.js";
import { generateValidLoan } from "../../../actors/loan/generateValidLoan.js";
import { pool } from "../../../db/pool.js";

describe("updateLoan()", () => {
  let financialProfile;
  let savedLoan;

  beforeAll(async () => {
    financialProfile = await createMockFinancialProfile();
    const loanData = generateValidLoan(financialProfile.id);
    savedLoan = await saveLoan(loanData);
  });

  afterAll(async () => {
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
    await pool.end();
  });

  it("should update loan field and return updated loan", async () => {
    const updated = await updateLoan(savedLoan.id, { termYears: 20 });
    expect(updated.term_years).toBe(20);

    const fetched = await getLoanById(savedLoan.id);
    expect(fetched.term_years).toBe(20);
  });

  it("should throw error for invalid update input", async () => {
    await expect(() =>
      updateLoan(savedLoan.id, { principal: "not-a-number" })
    ).rejects.toThrow();
  });

  it("should throw error for invalid ID", async () => {
    await expect(() =>
      updateLoan(null, { termYears: 15 })
    ).rejects.toThrow("Invalid loan id");
  });

  it("should update updated_at timestamp", async () => {
    const before = new Date(savedLoan.updated_at || savedLoan.saved_at).getTime();
    const updated = await updateLoan(savedLoan.id, { termYears: 25 });
    const after = new Date(updated.updated_at).getTime();
    expect(after).toBeGreaterThan(before);
  });

});
