import { pool } from "../../db/pool.js";
import { AppError } from "../../errors/AppError.js";
import { AuthErrors } from "../../errors/authErrors.js";

export async function checkEmailAvailability(email) {
  if (!email || typeof email !== "string")
    throw new AppError(AuthErrors.REGISTER.INVALID_INPUT);

  const query = `
    SELECT 1 FROM users
    WHERE email = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [email]);
  if (result.rowCount > 0)
    throw new AppError(AuthErrors.REGISTER.USER_EXISTS, 'Email is not available at this moment');

  return true;
}
