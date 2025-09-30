import { pool } from "../../db/pool.mjs";

export async function createMockLoan(loanId, financialProfileId) {
  await pool.query(
    `INSERT INTO loans (
      id,
      financial_profile_id,
      start_date,
      term_years,
      principal,
      interest_rate,
      payment_frequency_per_year,
      compounding_frequency_per_year,
      grace_period_months,
      balloon_payment,
      loan_type,
      currency,
      saved_at,
      updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW()
    )`,
    [
      loanId,
      financialProfileId,
      new Date("2025-10-01"),
      5,
      10000,
      0.07,
      12,
      12,
      0,
      null,
      "personal",
      "USD"
    ]
  );

  return {
    id: loanId,
    financialProfileId,
    startDate: new Date("2025-10-01"),
    termYears: 5,
    principal: 10000,
    interestRate: 0.07,
    paymentFrequencyPerYear: 12,
    compoundingFrequencyPerYear: 12,
    gracePeriodMonths: 0,
    balloonPayment: null,
    loanType: "personal",
    currency: "USD"
  };
}
