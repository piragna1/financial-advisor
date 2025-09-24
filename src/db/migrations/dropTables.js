import { pool } from "../pool.js";

export async function dropTables() {
  await pool.query(`DROP TABLE IF EXISTS loans;`);
  console.log("🗑️ loans table dropped");

  await pool.query(`DROP TABLE IF EXISTS financial_profiles;`);
  console.log("🗑️ financial_profiles table dropped");
}
