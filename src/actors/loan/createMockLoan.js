// src/actors/loans/createMockLoan.js
import { pool } from "../../db/pool.js";

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
      5,               // term_years
      10000,           // principal
      0.07,            // interest_rate
      12,              // payment_frequency_per_year
      12,              // compounding_frequency_per_year
      0,               // grace_period_months
      null,            // balloon_payment
      "personal",      // loan_type
      "USD"            // currency
    ]
  );
}