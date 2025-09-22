// userRepo.js

import { mockUsers } from "../config/mock.users.db.config.js";

export async function findUserByEmail(email) {
  //checked
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