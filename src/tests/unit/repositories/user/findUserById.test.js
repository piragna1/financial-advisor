import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";
import { findUserById, saveUser } from "../../../repositories/userRepository.js";

describe("findUserById(id)", () => {
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

  it("should return the user if ID exists", async () => {
    await saveUser(baseUser);
    const result = await findUserById(baseUser.id);
    expect(result).toMatchObject({
      id: baseUser.id,
      email: baseUser.email,
      password_hash: baseUser.passwordHash
    });
  });

  it("should throw USER_NOT_FOUND if ID does not exist", async () => {
    const fakeId = uuidv4();
    await expect(findUserById(fakeId)).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should throw INVALID_INPUT if ID is null", async () => {
    await expect(findUserById(null)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if ID is undefined", async () => {
    await expect(findUserById(undefined)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if ID is a number", async () => {
    await expect(findUserById(123)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if ID is an object", async () => {
    await expect(findUserById({ id: baseUser.id })).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if ID is an array", async () => {
    await expect(findUserById([baseUser.id])).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if ID is empty string", async () => {
    await expect(findUserById("")).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should throw INVALID_INPUT if ID is whitespace only", async () => {
    await expect(findUserById("   ")).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT"
    });
  });

  it("should trim ID before querying", async () => {
    await saveUser(baseUser);
    const result = await findUserById(`  ${baseUser.id}  `);
    expect(result.id).toBe(baseUser.id);
  });
});
