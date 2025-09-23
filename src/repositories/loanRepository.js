import { AppError } from "../errors/AppError.js";
import { LoanErrors } from "../errors/loanErrors.js";
import { generateLoanId } from "../actors/loan/generateLoanId.js";
import { mockLoans } from "../config/mock.loans.db.config.js";
import { Pool } from "pg";
import { pool } from "../db/pool.js";
import { validateLoanInput } from "../actors/validators/loan/validateLoanInput.js";
import { v4 } from "uuid";

export async function saveLoan(loanData) {
  validateLoanInput(loanData);
  console.log('valid data')


  try {
    const query = `INSERT INTO loans(
            id,financial_profile_id,start_date,term_years,principal, interest_rate,payment_frequency_per_year,compounding_frequency_per_year,grace_period_months,balloon_payment,loan_type,currency,saved_at
        )
        VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
        RETURNING *;
        `;

    const values = [
      loanData.id,
      loanData.financialProfileId,
      loanData.startDate,
      loanData.termYears,
      loanData.principal,
      loanData.interestRate,
      loanData.paymentFrequencyPerYear,
      loanData.compoundingFrequencyPerYear,
      loanData.gracePeriodMonths,
      loanData.balloonPayment,
      loanData.loanType,
      loanData.currency,
      loanData.savedAt
    ];

    console.log(query)
    console.log(values)

    const result = await pool.query(query, values);
console.log(result)
    return result.rows[0];
  } catch (error) {
    console.error('DB Error:', error);
    throw new AppError(LoanErrors.CREATION.FAILED_CREATION, error);
  }
}

export async function getLoanById(id) {
  if (!id || typeof id !== "string") throw new Error("Invalid loan id");

  const query = `
    SELECT * FROM loans
    WHERE id = $1;
    `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}

export async function updateLoan(id, updates) {
  if (!id || typeof id !== "string") throw new Error("Invalid loan id");
  validateLoanInput(updates);

  const fields = [];
  const values = [];
  let index = 1;
  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = $${index}`);
    values.push(value);
    index++;
  }
  values.push(new Date());
  values.push(id);

  const query = `
    UPDATE loans
    SET ${fields.join(", ")}, updated_at = $${index}
    WHERE id = $${index + 1}
    RETURNING *;
    `;

  const result = await pool.query(query, values);
  return result.rows[0] || null;
}

export async function deleteLoan(id) {
  //deletion requires implementation
  if (!id || typeof id !== "string") throw new Error("Invalid loan id");

  const query = `
    UPDATE loans
    WHERE id = $2
    RETURNING *;
    `;
  const result = await pool.query(query, [new Date(), id]);
  return result.rows[0] || null;
}

export async function getLoans() {
  const query = `
    SELECT * FROM loans
    ORDER BY saved_at DESC;
    `;
  const result = await pool.query(query);
  return result.rows;
}
