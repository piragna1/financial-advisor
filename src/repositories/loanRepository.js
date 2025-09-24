import { AppError } from "../errors/AppError.js";
import { LoanErrors } from "../errors/loanErrors.js";
import { pool } from "../db/pool.js";
import { validateLoanInput } from "../actors/validators/loan/validateLoanInput.js";
import { validateLoanUpdate } from "../actors/validators/loan/validateLoanUpdate.js";

export async function saveLoan(loanData) {
  validateLoanInput(loanData);

  try {
    const query = `INSERT INTO loans(
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
            saved_at
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


    const result = await pool.query(query, values);
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
  validateLoanUpdate(updates);

const columnMap = {
    financialProfileId: "financial_profile_id",
    startDate: "start_date",
    termYears: "term_years",
    principal: "principal",
    interestRate: "interest_rate",
    paymentFrequencyPerYear: "payment_frequency_per_year",
    compoundingFrequencyPerYear: "compounding_frequency_per_year",
    gracePeriodMonths: "grace_period_months",
    balloonPayment: "balloon_payment",
    loanType: "loan_type",
    currency: "currency",
    savedAt: "saved_at",
    updatedAt: "updated_at",
  };

  const fields = [];
  const values = [];
  let index = 1;
  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${columnMap[key]} = $${index}`);
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
  if (!id || typeof id !== "string") throw new Error("Invalid loan id");

  const query = `
    DELETE FROM loans
    WHERE id = $1
    RETURNING *;
  `;
  const result = await pool.query(query, [id]);
  return result.rows[0] || null;
}


export async function getLoans() {
  const query = `
    SELECT * FROM loans
    ORDER BY saved_at DESC;
  `;
  const result = await pool.query(query);

  return result.rows.map(row => ({
    ...row,
    principal: parseFloat(row.principal),
    interest_rate: parseFloat(row.interest_rate),
    balloon_payment: row.balloon_payment !== null ? parseFloat(row.balloon_payment) : null
  }));
}

