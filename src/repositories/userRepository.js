// userRepository.js
import { mockUsers } from "../config/mock.users.db.config.js";
import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";

import { pool } from "../db/pool.js";

export async function saveUser(user) {
  console.log('user received on saveUser', user)


  if (!user || typeof user !== "object") throw new Error("Invalid user input");

  user.email = user.email.toLocaleLowerCase();
  user.email = user.email.trim();

  const query = `
    INSERT INTO users (id, email, password_hash, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    user.id,
    user.email,
    user.hashedPassword,
    new Date(),
    new Date()
  ];

  const result = await pool.query(query, values);
  console.log('result:', result)
  return result.rows[0];
}

export async function findUserByEmail(email) {
  console.log('findUserByEmail()')
  if (!email || typeof email !== "string" || email.trim() === "") {
    throw new AppError(AuthErrors.REGISTER.INVALID_INPUT, "Email must be a valid string");
  }

  const normalizedEmail = email.trim().toLowerCase();
  console.log('normalize emaiL', normalizedEmail)

  const query = `
    SELECT * FROM users
    WHERE LOWER(email) = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [normalizedEmail]);
  console.log('result',result.rows)


  if (result.rowCount === 0) return null;

  return result.rows[0];
}
export async function findUserById(id) {

  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(AuthErrors.REGISTER.INVALID_INPUT, "User ID must be a valid string");
  }

  const query = `
    SELECT * FROM users
    WHERE id = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [id.trim()]);

  if (result.rowCount === 0) {
    throw new AppError(AuthErrors.LOGIN.USER_NOT_FOUND, "User not found");
  }

  return result.rows[0];
}

export async function updateUser(id, updates) {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(AuthErrors.LOGIN.USER_NOT_FOUND, "User ID must be a valid string");
  }

  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    throw new AppError(AuthErrors.REGISTER.INVALID_INPUT, "Updates must be a valid object");
  }

  const allowedFields = ["email", "passwordHash"];
  const fields = Object.entries(updates).filter(([key]) => allowedFields.includes(key));

  if (fields.length === 0) {
    throw new AppError(AuthErrors.REGISTER.INVALID_INPUT, "No valid fields to update");
  }

  const setClause = fields.map(([key], i) => `${key === "passwordHash" ? "password_hash" : key} = $${i + 2}`).join(", ");
  const values = [id.trim(), ...fields.map(([, value]) => value)];

  const query = `
    UPDATE users
    SET ${setClause}, updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    throw new AppError(AuthErrors.LOGIN.USER_NOT_FOUND, "User not found");
  }

  return result.rows[0];

}

export async function deleteUser(id) {
  if (!id || typeof id !== "string" || id.trim() === "") {
    throw new AppError(AuthErrors.LOGIN.USER_NOT_FOUND, "User ID must be a valid string");
  }
  
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id.trim()]);

  if (result.rowCount === 0) {
    throw new AppError(AuthErrors.LOGIN.USER_NOT_FOUND, "User not found");
  }
  
  return result.rows[0];
}


export async function deleteUserByEmail(email) {
  console.log('deleteUserByEmail')

  const query = `DELETE FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);

  console.log('result.rows', result.rows)

  return result.rowCount > 0;
}

export async function listAllUsers() {
  const query = `SELECT id, email, created_at FROM users ORDER BY created_at DESC`;
  const result = await pool.query(query);
  return result.rows;
}