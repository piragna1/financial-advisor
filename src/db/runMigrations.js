import { createFinancialProfilesTable } from "./migrations/createFinancialProfilesTable.js";
import { createLoansTable } from "./migrations/createLoansTable.js";
import { pool } from "./pool.js";

async function runMigrations() {
  await createFinancialProfilesTable();
  await createLoansTable();
  await pool.end();
}

runMigrations();
