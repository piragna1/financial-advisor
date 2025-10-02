import { v4 as uuidv4 } from "uuid";
import { pool } from "../../db/pool.mjs";
import { isValidUUID } from "../../tests/helpers/testHelpers.js";
import { AppError } from "../../errors/AppError.js";
import {FinancialErrors} from '../../errors/financialProfileErrors.js'

export async function createMockFinancialProfile(overrides = {}) {

  if (!overrides.userId || !isValidUUID(overrides.userId)) {
    throw new AppError(FinancialErrors.CREATE.INVALID_USER_ID);
  }
  
  const id = uuidv4();
  const userId = overrides.userId;
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
