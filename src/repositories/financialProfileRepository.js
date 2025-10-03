import { pool } from "../db/pool.mjs";
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
    profile.updatedAt || new Date()
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

export async function updateFinancialProfile(id, updates) {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(FinancialErrors.UPDATE.INVALID_ID, "Profile ID must be a valid string");
  }

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    throw new AppError(FinancialErrors.UPDATE.INVALID_INPUT, "Updates must be a valid object");
  }

  const allowedFields = ["salary"];
  const fields = Object.entries(updates).filter(([key]) => allowedFields.includes(key));

  if (fields.length === 0) {
    throw new AppError(FinancialErrors.UPDATE.NO_VALID_FIELDS, "No valid fields to update");
  }

  const setClause = fields.map(([key], i) => `${key} = $${i + 2}`).join(", ");
  const values = [id.trim(), ...fields.map(([, value]) => value)];

  const query = `
    UPDATE financial_profiles
    SET ${setClause}, updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    throw new AppError(FinancialErrors.UPDATE.NOT_FOUND, "Financial profile not found");
  }

  const row = result.rows[0];
  row.salary = Number(row.salary);
  return row;
}


export async function deleteFinancialProfile(id) {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(FinancialErrors.DELETE.INVALID_ID, "Profile ID must be a valid string");
  }

  const query = `
    DELETE FROM financial_profiles
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id.trim()]);

  if (result.rowCount === 0) {
    throw new AppError(FinancialErrors.DELETE.NOT_FOUND, "Financial profile not found");
  }

  const row = result.rows[0];
  row.salary = Number(row.salary);
  return row;
}
