import { pool } from "../../db/pool.mjs";


export async function createMockUser(userId, email = `${userId}@example.com`, passwordHash = 'hashedPassword') {

if (!email || typeof email !== "string") {
  throw new Error("createMockUser requires a valid email");
}


  await pool.query(`
    INSERT INTO users (id, email, password_hash, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
  `, [userId, email, passwordHash]);

  
const check = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);



  return { id: userId, email };
}




