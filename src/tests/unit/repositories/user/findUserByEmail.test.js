import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../db/pool.js";
import { findUserByEmail } from "../../../repositories/userRepository.js";
import { saveUser } from "../../../repositories/userRepository.js";

describe("findUserByEmail(email)", () => {
  const baseUser = {
    id: uuidv4(),
    email: "user@example.com",
    passwordHash: "hashed-password",
    createdAt: new Date(),
    updatedAt: null
  };

  beforeEach(async () => {
    await pool.query("DELETE FROM users;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users;");
  });

  it("should return the user if email exists", async () => {
    await saveUser(baseUser);
    const result = await findUserByEmail("user@example.com");
    expect(result).toMatchObject({
      id: baseUser.id,
      email: baseUser.email,
      password_hash: baseUser.passwordHash
    });
  });

  it("should return null if email does not exist", async () => {
    const result = await findUserByEmail("nonexistent@example.com");
    expect(result).toBeNull();
  });

  it("should find user regardless of casing", async () => {
    await saveUser(baseUser);
    const result = await findUserByEmail("USER@EXAMPLE.COM");
    expect(result.email).toBe("user@example.com");
  });

  it("should find user with leading/trailing spaces", async () => {
    await saveUser(baseUser);
    const result = await findUserByEmail("  user@example.com  ");
    expect(result.email).toBe("user@example.com");
  });

  it("should throw INVALID_INPUT if email is null", async () => {
    await expect(findUserByEmail(null)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is undefined", async () => {
    await expect(findUserByEmail(undefined)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is a number", async () => {
    await expect(findUserByEmail(123)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is an object", async () => {
    await expect(findUserByEmail({ email: "user@example.com" })).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is an array", async () => {
    await expect(findUserByEmail(["user@example.com"])).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is empty string", async () => {
    await expect(findUserByEmail("")).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is whitespace only", async () => {
    await expect(findUserByEmail("   ")).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });
});
