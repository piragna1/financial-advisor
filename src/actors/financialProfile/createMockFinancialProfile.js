import { v4 as uuidv4 } from "uuid";
import { pool } from "../../db/pool.mjs";

export async function createMockFinancialProfile(overrides = {}) {

if (!overrides.userId || typeof overrides.userId !== 'string') {
  throw new Error('Missing or invalid userId in financial profile mock');
}



  const id = overrides.id || uuidv4();


  

  const userId = overrides.userId || "user-mock";
  const salary = overrides.salary || 50000;
  const now = new Date();

  const result = await pool.query(
    `
      INSERT INTO financial_profiles(id, user_id, salary, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
    [id, userId, salary, now, now]
  );

  return result.rows[0];
}
