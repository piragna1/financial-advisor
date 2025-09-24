import { createFinancialProfilesTable } from "./migrations/createFinancialProfilesTable.js";
import { createLoansTable } from "./migrations/createLoansTable.js";
import { createUsersTable } from "./migrations/createUsersTable.js";
import { pool } from "./pool.js";

async function runMigrations() {
  // await createFinancialProfilesTable(); created
  // await createLoansTable(); created
  // await createUsersTable(); created
  await pool.end();
}

runMigrations();
