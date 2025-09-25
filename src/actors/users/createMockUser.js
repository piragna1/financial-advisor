import { pool } from "../../db/pool";

export async function createMockUser(userId) {
  await pool.query(`
    INSERT INTO users (id, email, password_hash, created_at)
    VALUES ($1, $2, $3, NOW())
  `, [userId, "mock@example.com", "hashed-password"]);
}
