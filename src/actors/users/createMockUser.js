import { pool } from "../../db/pool.mjs";


export async function createMockUser(userId, email = `${userId}@example.com`) {

if (!email || typeof email !== "string") {
  throw new Error("createMockUser requires a valid email");
}


  await pool.query(`
    INSERT INTO users (id, email, password_hash, created_at, updated_at)
    VALUES ($1, $2, $3, NOW(), NOW())
  `, [userId, email, "hashedPassword"]);

  
const check = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
console.log("Inserted user:", check.rows[0]);



  return { id: userId, email };
}




