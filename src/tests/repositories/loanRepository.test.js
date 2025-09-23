import {
  saveLoan,
  getLoanById,
  getLoans,
  updateLoan,
  deleteLoan,
} from "../../repositories/loanRepository.js";

import { pool } from "../../db/pool.js";
import { generateLoanId } from "../../actors/loan/generateLoanId.js";
import {generateFinancialProfileId} from '../../actors/financialProfile/generateFinancialProfileId.js'

describe("Loan Repository", () => {
  let loanId;

  const financial_profile_id = generateFinancialProfileId();

  const validLoan = {
    id: generateLoanId(),
    financialProfileId: financial_profile_id,
    startDate: new Date(),
    termYears: 5,
    principal: 10000,
    interestRate: 0.08,
    paymentFrequencyPerYear: 12,
    compoundingFrequencyPerYear: 12,
    gracePeriodMonths: 0,
    balloonPayment: 0,
    loanType: "personal",
    currency: "USD",
    savedAt: new Date()
  };

  console.log(loanId)

  beforeAll(async () => {
    loanId = validLoan.id;
    
  pool.query(`
    INSERT INTO financial_profiles(id, user_id, salary,created_at,updated_at)
    VALUES $1,$2,$3,$4`, [financial_profile_id, 'u1', 50000, new Date(), new Date()]);
  });

  afterAll(async () => {
    await pool.end();
  });

  test("saveLoan() should persist a valid loan", async () => {
    console.log("Saving loan:", validLoan);

    
    const saved = await saveLoan(validLoan);
//code does not get here 
    console.log("Saved result:", saved);

    expect(saved.id).toBe(loanId);
    expect(saved.principal).toBe(validLoan.principal);
    expect(saved.currency).toBe(validLoan.currency);
    expect(saved.savedAt).toBeDefined();
  });

  test("saveLoan() should throw on invalid input", async () => {
    await expect(saveLoan(null)).rejects.toThrow("Invalid loan data received");
    await expect(saveLoan({})).rejects.toThrow();
  });

  test("getLoanById() should return the saved loan", async () => {
    const loan = await getLoanById(loanId);
    expect(loan).not.toBeNull();
    expect(loan.id).toBe(loanId);
  });

  test("getLoanById() should return null for nonexistent id", async () => {
    const loan = await getLoanById("nonexistent-id");
    expect(loan).toBeNull();
  });

  test("getLoans() should include the saved loan", async () => {
    const loans = await getLoans();
    expect(loans.some((l) => l.id === loanId)).toBe(true);
  });

  test("updateLoan() should modify fields correctly", async () => {
    const updated = await updateLoan(loanId, { interest_rate: 0.1 });
    expect(updated.interest_rate).toBe(0.1);
    expect(updated.updated_at).toBeDefined();
  });

  test("updateLoan() should throw on invalid input", async () => {
    await expect(updateLoan(null, {})).rejects.toThrow("Invalid loan id");
    await expect(updateLoan(loanId, null)).rejects.toThrow(
      "Invalid update values received"
    );
  });

  test("deleteLoan() should soft-delete the loan", async () => {
    const deleted = await deleteLoan(loanId);
    expect(deleted.deleted_at).toBeDefined();

    const loan = await getLoanById(loanId);
    expect(loan).toBeNull();

    const loans = await getLoans();
    expect(loans.some((l) => l.id === loanId)).toBe(false);
  });

  test("deleteLoan() should return null for already deleted loan", async () => {
    const result = await deleteLoan(loanId);
    expect(result).toBeNull();
  });
});
