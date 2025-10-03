import { saveLoan } from "../../../../repositories/loanRepository.js";
import { createMockFinancialProfile } from "../../../../actors/financialProfile/createMockFinancialProfile.js";
import { generateLoanId } from "../../../../actors/loan/generateLoanId.js";
import { pool } from "../../../../db/pool.mjs";
import {generateValidLoan} from '../../../../actors/loan/generateValidLoan.js'
import { v4 } from "uuid";
import {createMockUser} from '../../../../actors/users/createMockUser.js'

describe("saveLoan() — validación completa", () => {
  let financialProfile;
  let baseUser;
  beforeAll(async () => {
    resetDatabase();
    baseUser = await createMockUser(v4());
    financialProfile = await createMockFinancialProfile({userId:baseUser.id});
    console.log('finprof:',financialProfile)
  });

  afterAll(async () => {
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
  });

  it("should save a valid loan", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const savedLoan = await saveLoan(baseLoan);
    expect(savedLoan.id).toBe(baseLoan.id);
  });

  it("should fail if loanData is not an object", async () => {
    await expect(() => saveLoan(null)).rejects.toThrow("Invalid loan data received");
  });

  it("should fail if id is missing", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);

    const loan = { ...baseLoan, id: undefined };
    await expect(() => saveLoan(loan)).rejects.toThrow("Loan ID must be a string");
  });

  it("should fail if financialProfileId is not a string", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, financialProfileId: 123 };
    await expect(() => saveLoan(loan)).rejects.toThrow("Financial profile ID must be a string");
  });

  it("should fail if startDate is not a valid Date", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, startDate: "2025-01-01" };
    await expect(() => saveLoan(loan)).rejects.toThrow("startDate must be a valid Date object");
  });

  it("should fail if termYears is not a number", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, termYears: "five" };
    await expect(() => saveLoan(loan)).rejects.toThrow("termYears must be a valid number");
  });

  it("should fail if principal is NaN", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, principal: NaN };
    await expect(() => saveLoan(loan)).rejects.toThrow("Principal must be a valid number");
  });

  it("should fail if interestRate is negative", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, interestRate: -1 };
    await expect(() => saveLoan(loan)).rejects.toThrow("Interest rate must be a positive number");
  });

  it("should fail if paymentFrequencyPerYear is zero", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, paymentFrequencyPerYear: 0 };
    await expect(() => saveLoan(loan)).rejects.toThrow("Payment frequency must be a positive number");
  });

  it("should fail if compoundingFrequencyPerYear is negative", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, compoundingFrequencyPerYear: -1 };
    await expect(() => saveLoan(loan)).rejects.toThrow("Compounding frequency must be a positive number");
  });

  it("should fail if gracePeriodMonths is negative", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, gracePeriodMonths: -3 };
    await expect(() => saveLoan(loan)).rejects.toThrow("Grace period must be zero or positive");
  });

  it("should fail if balloonPayment is negative", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, balloonPayment: -100 };
    await expect(() => saveLoan(loan)).rejects.toThrow("Balloon payment must be zero or positive");
  });

  it("should fail if loanType is unsupported", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, loanType: "vacation" };
    await expect(() => saveLoan(loan)).rejects.toThrow("Unsupported loan type: vacation");
  });

  it("should fail if currency is not a 3-letter code", async () => {
    const baseLoan = generateValidLoan(financialProfile.id);
    const loan = { ...baseLoan, currency: "usd$" };
    await expect(() => saveLoan(loan)).rejects.toThrow("Currency must be a 3-letter ISO code (e.g., USD, EUR)");
  });
});