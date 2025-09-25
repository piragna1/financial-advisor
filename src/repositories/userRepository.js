// userRepo.js

import { checkEmailAvailability } from "../actors/users/checkEmailAvailability.js";
import { validateRegistrationInput } from "../actors/validators/auth/validateRegistrationInput.js";
import { mockUsers } from "../config/mock.users.db.config.js";
import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";

import { pool } from "../db/pool.js";

export async function saveUser(user) {
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
    user.passwordHash,
    user.createdAt || new Date(),
    user.updatedAt || null
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

export async function findUserByEmail(email) {
  if (!email || typeof email !== "string" || email.trim() === "") {
    throw new AppError(AuthErrors.REGISTER.INVALID_INPUT, "Email must be a valid string");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const query = `
    SELECT * FROM users
    WHERE LOWER(email) = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [normalizedEmail]);

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

//update
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

export function listUsers() {
  return mockUsers.slice();
}
//------------------
/* 

// Setup: reset mockUsers before each test
function resetMockUsers() {
  mockUsers.length = 0;
  mockUsers.push(
    { id: "u1", email: "a@example.com", passwordHash: "hash1" },
    { id: "u2", email: "b@example.com", passwordHash: "hash2" },
    { id: "u3", email: "c@example.com", passwordHash: "hash3" }
  );
}

function runTest(label, inputId, expectedUserId) {
  resetMockUsers();
  findUserById(inputId)
    .then((result) => {
      const match = result?.id === expectedUserId;
      if (match) {
        console.log(`✅ ${label} → found ${expectedUserId}`);
      } else {
        console.log(
          `❌ ${label} → expected ${expectedUserId}, got ${
            result?.id ?? "null"
          }`
        );
      }
    })
    .catch((err) => {
      console.error(`❌ ${label} → threw error: ${err.message}`);
    });
}

const testCases = [
  ["valid ID u1", "u1", "u1"],
  ["valid ID u2", "u2", "u2"],
  ["valid ID u3", "u3", "u3"],
  ["nonexistent ID", "u999", undefined],
  ["null ID", null, undefined],
  ["undefined ID", undefined, undefined],
  ["empty string ID", "", undefined],
  ["numeric ID", 12345, undefined],
  ["boolean ID", true, undefined],
  ["object ID", { id: "u1" }, undefined],
  ["array ID", ["u1"], undefined],
  ["symbol ID", Symbol("u1"), undefined],
  ["duplicate ID (u2 appears twice)", "u2", "u2"],
];

// Inject duplicate for edge case
mockUsers.push({
  id: "u2",
  email: "duplicate@example.com",
  passwordHash: "hashX",
});

for (const [label, inputId, expectedUserId] of testCases) {
  runTest(label, inputId, expectedUserId);
}
 */


//--- listUsers(); -> working properly
// console.log(listUsers())
//---

// --- deleteUser();

// // Setup: reset mockUsers before each test
// function resetMockUsers() {
//   mockUsers.length = 0;
//   mockUsers.push(
//     { id: "u1", email: "a@example.com", passwordHash: "hash1" },
//     { id: "u2", email: "b@example.com", passwordHash: "hash2" },
//     { id: "u3", email: "c@example.com", passwordHash: "hash3" }
//   );
// }

// function runTest(label, idToDelete, expectedRemainingIds) {
//   resetMockUsers();
//   deleteUser(idToDelete);
//   const remaining = listUsers().map((u) => u.id);
//   const match = JSON.stringify(remaining) === JSON.stringify(expectedRemainingIds);

//   if (match) {
//     console.log(`✅ ${label} → remaining: [${remaining.join(", ")}]`);
//   } else {
//     console.error(`❌ ${label} → expected: [${expectedRemainingIds.join(", ")}], got: [${remaining.join(", ")}]`);
//   }
// }

// const testCases = [
//   ["delete existing u1", "u1", ["u2", "u3"]],
//   ["delete existing u2", "u2", ["u1", "u3"]],
//   ["delete existing u3", "u3", ["u1", "u2"]],
//   ["delete nonexistent ID", "u999", ["u1", "u2", "u3"]],
//   ["delete null ID", null, ["u1", "u2", "u3"]],
//   ["delete undefined ID", undefined, ["u1", "u2", "u3"]],
//   ["delete empty string", "", ["u1", "u2", "u3"]],
//   ["delete numeric ID", 12345, ["u1", "u2", "u3"]],
//   ["delete boolean ID", true, ["u1", "u2", "u3"]],
//   ["delete object ID", { id: "u1" }, ["u1", "u2", "u3"]],
//   ["delete array ID", ["u1"], ["u1", "u2", "u3"]],
//   ["delete symbol ID", Symbol("u1"), ["u1", "u2", "u3"]],
//   ["delete duplicate ID (u2 appears twice)", "u2", ["u1", "u3"]] // optional if duplicates exist
// ];

// for (const [label, idToDelete, expectedRemainingIds] of testCases) {
//   runTest(label, idToDelete, expectedRemainingIds);
// }

// ---