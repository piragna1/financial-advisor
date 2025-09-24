import { saveLoan } from "../../repositories/loanRepository.js";
import { createMockFinancialProfile } from "../../actors/financialProfile/createMockFinancialProfile.js";
import { generateLoanId } from "../../actors/loan/generateLoanId.js";
import { pool } from "../../db/pool.js";

describe("saveLoan()", () => {
  let financialProfileId;

  beforeAll(async () => {
    financialProfileId = await createMockFinancialProfile();
  });

  afterAll(async () => {
    await pool.query("DELETE FROM loans;");
    await pool.query("DELETE FROM financial_profiles;");
    await pool.end();
  });

  it("should save a valid loan", async () => {

    const loanData = {
      id: generateLoanId(),
      financialProfileId: financialProfileId,
      startDate: new Date(),
      termYears: 5,
      principal: 10000,
      interestRate: 5.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: 0,
      loanType: "personal",
      currency: "USD",
      savedAt: new Date(),
    };

    const savedLoan = await saveLoan(loanData);

    expect(savedLoan).toMatchObject({
      id: loanData.id,
      financial_profile_id: loanData.financialProfileId,
      principal: loanData.principal.toString(),
      interest_rate: loanData.interestRate.toString(),
    });
  });

  //   it("should throw error for invalid loan data", async () => {
  //     const invalidLoan = {
  //       id: "bad-id",
  //       financialProfileId: null,
  //       startDate: "not-a-date",
  //       termYears: "five",
  //       principal: "ten thousand",
  //       interestRate: -1,
  //       paymentFrequencyPerYear: 0,
  //       compoundingFrequencyPerYear: -1,
  //       gracePeriodMonths: -5,
  //       balloonPayment: -100,
  //       loanType: "unknown",
  //       currency: "usd",
  //       savedAt: new Date()
  //     };

  //     await expect(() => saveLoan(invalidLoan)).rejects.toThrow("Financial profile ID must be a string");
  //   });
});
