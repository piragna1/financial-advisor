// userRepo.js

import { mockUsers } from "../config/mock.db.config.js";

export async function findUserByEmail(email) { //checked
  return mockUsers.find((user) => user.email === email);
}

export async function findUserById(id) {
  return mockUsers.find((user) => user.id === id);
}

export function saveUser(user) {
  mockUsers.push(user);
  return user;
}

export function listUsers() {
  return mockUsers.slice();
}

export function deleteUser(id) {
  for (let i = 0; i < mockUsers.length; i++) {
    if (mockUsers[i].id === id) {
      mockUsers.splice(i, 1);
      return;
    }
  }
}


//------------------


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
  findUserById(inputId).then((result) => {
    const match = result?.id === expectedUserId;
    if (match) {
      console.log(`✅ ${label} → found ${expectedUserId}`);
    } else {
      console.log(`❌ ${label} → expected ${expectedUserId}, got ${result?.id ?? "null"}`);
    }
  }).catch((err) => {
    console.error(`❌ ${label} → threw error: ${err.message}`);
  });
}

const testCases = [
  ["valid ID u1", "u1", "u1"],
  ["valid ID u2", "u2", "u2"],
  ["valid ID u3", "u3", "u3"],
  ["nonexistent ID", "u999", null],
  ["null ID", null, null],
  ["undefined ID", undefined, null],
  ["empty string ID", "", null],
  ["numeric ID", 12345, null],
  ["boolean ID", true, null],
  ["object ID", { id: "u1" }, null],
  ["array ID", ["u1"], null],
  ["symbol ID", Symbol("u1"), null],
  ["duplicate ID (u2 appears twice)", "u2", "u2"]
];

// Inject duplicate for edge case
mockUsers.push({ id: "u2", email: "duplicate@example.com", passwordHash: "hashX" });

for (const [label, inputId, expectedUserId] of testCases) {
  runTest(label, inputId, expectedUserId);
}
