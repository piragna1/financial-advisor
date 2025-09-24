import { v4 as uuidv4 } from "uuid";

export function generateValidUser(overrides = {}) {
  return {
    id: uuidv4(),
    email: "user@example.com",
    password: "ValidPassword123",
    passwordHash: "hashed-password",
    name: "Test",
    lastName: "User",
    createdAt: new Date(),
    updatedAt: null,
    ...overrides
  };
}
