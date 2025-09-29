import { pool } from "../../db/pool.mjs";


export async function createMockUser(userId) {
  const email = `${userId}@example.com`; // ← email único por usuario

  const result = await pool.query(`
    INSERT INTO users (id, email, password_hash, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
  `, [userId, email, "hashedPassword"]);


    return { id: userId, email };
}

