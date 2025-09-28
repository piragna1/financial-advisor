import { pool } from "../../db/pool.js";


export async function createMockUser(userId) {
  const email = `${userId}@example.com`; // ← email único por usuario
  await pool.query(`
    INSERT INTO users (id, email, password_hash, created_at)
    VALUES ($1, $2, $3, NOW())
  `, [userId, email, "hashed-password"]);
    return { id: userId, email };
}

