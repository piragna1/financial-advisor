import { pool } from "../pool.js";

export async function createLoansTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS loans (
      id UUID PRIMARY KEY,
      financial_profile_id UUID NOT NULL REFERENCES financial_profiles(id),
      start_date TIMESTAMP NOT NULL,
      term_years INTEGER NOT NULL,
      principal NUMERIC NOT NULL,
      interest_rate NUMERIC NOT NULL,
      payment_frequency_per_year INTEGER NOT NULL,
      compounding_frequency_per_year INTEGER NOT NULL,
      grace_period_months INTEGER NOT NULL,
      balloon_payment NUMERIC NOT NULL,
      loan_type TEXT NOT NULL,
      currency TEXT NOT NULL,
      saved_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP
    );
  `);
  console.log("✅ loans table created");
}
