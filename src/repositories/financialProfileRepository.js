import { pool } from "../db/pool.js";
import { AppError } from "../errors/AppError.js";
import { FinancialErrors } from "../errors/financialProfileErrors.js";

export async function createFinancialProfile(profile) {
  if (!profile || typeof profile !== "object") {
    throw new AppError(FinancialErrors.CREATE.INVALID_INPUT, "Profile must be a valid object");
  }

  const { id, userId, salary } = profile;

  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(FinancialErrors.CREATE.INVALID_ID, "Missing or invalid profile ID");
  }

  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new AppError(FinancialErrors.CREATE.INVALID_USER_ID, "Missing or invalid user ID");
  }

  if (typeof salary !== "number" || isNaN(salary) || salary < 0) {
    throw new AppError(FinancialErrors.CREATE.INVALID_SALARY, "Salary must be a non-negative number");
  }

  const query = `
    INSERT INTO financial_profiles (id, user_id, salary, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    id.trim(),
    userId.trim(),
    salary,
    profile.createdAt || new Date(),
    profile.updatedAt || null
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}


export async function getFinancialProfileByUserId(userId) {
  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    throw new AppError(FinancialErrors.READ.INVALID_ID, "User ID must be a valid string");
  }

  const query = `
    SELECT * FROM financial_profiles
    WHERE user_id = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [userId.trim()]);

  if (result.rowCount === 0) {
    throw new AppError(FinancialErrors.READ.NOT_FOUND, "Financial profile not found");
  }

  return result.rows[0];
}
