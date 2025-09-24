import { dropTables } from "./migrations/dropTables.js";
import { pool } from "./pool.js";

async function runDrop() {
  await dropTables();
  await pool.end();
}

runDrop();
