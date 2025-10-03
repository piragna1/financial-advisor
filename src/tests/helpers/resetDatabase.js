// src/tests/helpers/resetDatabase.js
import { pool } from "../../db/pool.mjs";

export async function resetDatabase() {
  await pool.query(`
    TRUNCATE
      payments,
      schedules,
      loans,
      financial_profiles,
      profiles,
      users
    RESTART IDENTITY CASCADE;
  `);
}
