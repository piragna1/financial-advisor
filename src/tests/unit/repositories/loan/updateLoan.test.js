import { saveLoan, updateLoan, getLoanById } from "../../../../repositories/loanRepository.js";
import { createMockFinancialProfile } from "../../../../actors/financialProfile/createMockFinancialProfile.js";
import { generateValidLoan } from "../../../../actors/loan/generateValidLoan.js";
import { pool } from "../../../../db/pool.mjs";
import {createMockUser} from '../../../../actors/users/createMockUser.js'
import { v4 } from "uuid";

describe("updateLoan()", () => {
  let savedLoan;

  beforeAll(async () => {
    const baseUser = await createMockUser(v4());
    const financialProfile = await createMockFinancialProfile({userId:baseUser.id});
    const loanData = generateValidLoan(financialProfile.id);
    savedLoan = await saveLoan(loanData);
    console.log('savedLoan', savedLoan)
  });

  afterAll(async () => {
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
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
    console.log('should update updated_at timestamp')
    const before = new Date(savedLoan.saved_at).getTime();
    const updated = await updateLoan(savedLoan.id, { termYears: 25 });
    const after = new Date(updated.updated_at).getTime();
    expect(after).toBeGreaterThan(before);
  });

});
