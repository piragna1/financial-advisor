import { pool } from "../../db/pool.mjs";
import { hashPassword } from "../../utils/auth/hashPassword";
import { validate as isUuid } from "uuid";

export async function createMockUser(
  userId,
  email = `${userId}@example.com`,
  password = "hashedPassword"
) {
  const trimmedId = userId.trim();

  if (!email || typeof email !== "string") {
    throw new Error("createMockUser requires a valid email");
  }

  if (!isUuid(trimmedId)) {
    throw new Error("Invalid UUID format");
  }

  const passwordHash = hashPassword(password);
  console.log('inserting:', {trimmedId, email, passwordHash});

  try {
    await pool.query(
      `
      INSERT INTO users (id, email, password_hash, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
    `,
      [trimmedId, email, passwordHash]
    );
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      trimmedId,
    ]);

    if (rows.length === 0) {
      throw new Error(`User with ID ${trimmedId} was not inserted`);
    }
    console.log("User inserted:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("createMockUser failed:", error);
    throw error;
  }
}
