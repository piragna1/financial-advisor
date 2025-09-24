import { v4 as uuidv4 } from "uuid";
import { pool } from "../../db/pool.js";

export async function createMockFinancialProfile() {
  const id = uuidv4();
  const now = new Date();

  const result = await pool.query(
    `
            INSERT INTO financial_profiles(id,user_id,salary,created_at,updated_at)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *;
    `,
    [id, "user-mock", 50000, now, now]
  );

  return result.rows[0];
}
