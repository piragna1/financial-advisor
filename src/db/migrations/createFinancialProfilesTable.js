import { pool } from "../pool.js";

export async function createFinancialProfilesTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS financial_profiles (
      id UUID PRIMARY KEY,
      user_id TEXT NOT NULL,
      salary NUMERIC NOT NULL,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
    );
  `);
  console.log("✅ financial_profiles table created");
}
