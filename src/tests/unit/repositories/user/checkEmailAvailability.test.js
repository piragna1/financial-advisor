import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import { checkEmailAvailability } from "../../../../actors/users/checkEmailAvailability.js";
import { saveUser } from "../../../../repositories/userRepository.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("checkEmailAvailability(email)", () => {
  const testEmail = "test@example.com";

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
  });

  it("should return true if email is available", async () => {
    const result = await checkEmailAvailability("available@example.com");
    expect(result).toBe(true);
  });

  it("should throw USER_EXISTS if email is already registered", async () => {
    const user = {
      id: uuidv4(),
      email: testEmail,
      passwordHash: "hashed-password",
      createdAt: new Date(),
      updatedAt: null
    };
    await saveUser(user);

    await expect(checkEmailAvailability(testEmail)).rejects.toMatchObject({
      code: "REGISTER_USER_EXISTS"
    });
  });

  it("should throw USER_EXISTS if email is registered with different casing", async () => {
    const user = {
      id: uuidv4(),
      email: "User@Example.com",
      passwordHash: "hashed-password",
      createdAt: new Date(),
      updatedAt: null
    };
    await saveUser(user);

    await expect(checkEmailAvailability("user@example.com")).rejects.toMatchObject({
      code: "REGISTER_USER_EXISTS"
    });
  });

  it("should throw USER_EXISTS if email is registered with trailing spaces", async () => {
    const user = {
      id: uuidv4(),
      email: "user@example.com",
      passwordHash: "hashed-password",
      createdAt: new Date(),
      updatedAt: null
    };
    await saveUser(user);

    await expect(checkEmailAvailability("  user@example.com  ")).rejects.toMatchObject({
      code: "REGISTER_USER_EXISTS"
    });
  });

  it("should throw INVALID_INPUT if email is null", async () => {
    await expect(checkEmailAvailability(null)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is undefined", async () => {
    await expect(checkEmailAvailability(undefined)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is a number", async () => {
    await expect(checkEmailAvailability(12345)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is an object", async () => {
    await expect(checkEmailAvailability({ email: testEmail })).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is an array", async () => {
    await expect(checkEmailAvailability([testEmail])).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is an empty string", async () => {
    await expect(checkEmailAvailability("")).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if email is only whitespace", async () => {
    await expect(checkEmailAvailability("   ")).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should return true for email with uppercase letters if not registered", async () => {
    const result = await checkEmailAvailability("TEST@EXAMPLE.COM");
    expect(result).toBe(true);
  });

  it("should return true for email with trailing spaces if not registered", async () => {
    const result = await checkEmailAvailability("  newuser@example.com  ");
    expect(result).toBe(true);
  });

  it("should return true for email with plus alias if not registered", async () => {
    const result = await checkEmailAvailability("user+alias@example.com");
    expect(result).toBe(true);
  });
});
