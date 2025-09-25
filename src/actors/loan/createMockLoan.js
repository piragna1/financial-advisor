// src/actors/loans/createMockLoan.js
import { pool } from "../../db/pool.js";

export async function createMockLoan(loanId) {
  await pool.query(
    `INSERT INTO loans (id, amount, interest_rate, created_at)
     VALUES ($1, $2, $3, NOW())`,
    [loanId, 1000, 0.05]
  );
}
