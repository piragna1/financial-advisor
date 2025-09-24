import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../db/pool.js";
import { checkEmailAvailability } from "../../../actors/users/checkEmailAvailability.js";
import { saveUser } from "../../../repositories/userRepository.js";

describe("checkEmailAvailability(email)", () => {
  const testEmail = "test@example.com";

  beforeEach(async () => {
    await pool.query("DELETE FROM users;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users;");
    await pool.end();
  });

  it("should return true if email is available", async () => {
    const result = await checkEmailAvailability("available@example.com");
    expect(result).toBe(true);
  });

  it("should throw if email is already registered", async () => {
    const user = {
      id: uuidv4(),
      email: testEmail,
      passwordHash: "hashed-password",
      createdAt: new Date(),
      updatedAt: null
    };
    await saveUser(user);

    await expect(() => checkEmailAvailability(testEmail)).rejects.toThrow("Email is not available at this moment");

  });

  // it("should throw if email is null", async () => {
  //   await expect(() => checkEmailAvailability(null)).rejects.toThrow("Email must be a valid string");
  // });

  // it("should throw if email is not a string", async () => {
  //   await expect(() => checkEmailAvailability(123)).rejects.toThrow("Email must be a valid string");
  // });

  // it("should throw if email is empty string", async () => {
  //   await expect(() => checkEmailAvailability("")).rejects.toThrow("Email must be a valid string");
  // });
});
