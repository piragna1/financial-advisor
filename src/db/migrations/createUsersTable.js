import { pool } from "../pool.js";

export async function createUsersTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ users table created successfully");
  } catch (error) {
    console.error("❌ Error creating users table:", error);
    throw error;
  }
}
