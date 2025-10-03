import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import { saveUser } from "../../../../repositories/userRepository.js";
import {createMockUser} from '../../../../actors/users/createMockUser.js'
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("saveUser(user)", () => {
  const baseUser = {
    id: uuidv4(),
    email: "user@example.com",
    passwordHash: "hashed-password",
    createdAt: new Date(),
    updatedAt: null
  };

  beforeEach(async () => {
    resetDatabase();
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users;");
  });

  it("should save a valid user and return it", async () => {
    const result = await saveUser(baseUser);
    expect(result).toMatchObject({
      id: baseUser.id,
      email: baseUser.email,
      password_hash: baseUser.passwordHash
    });
  });

  it("should default createdAt if not provided", async () => {
    const user = { ...baseUser, createdAt: undefined };
    const result = await saveUser(user);
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it("should throw if user is null", async () => {
    await expect(() => saveUser(null)).rejects.toThrow("Invalid user input");
  });

  it("should throw if user is not an object", async () => {
    await expect(() => saveUser("not-an-object")).rejects.toThrow("Invalid user input");
  });

  it("should throw if required fields are missing", async () => {
    const user = { email: "missing@example.com" };
    await expect(() => saveUser(user)).rejects.toThrow();
  });

  it("should throw if email is duplicated", async () => {
    await saveUser(baseUser);
    const duplicate = { ...baseUser, id: uuidv4() };
    await expect(() => saveUser(duplicate)).rejects.toThrow();
  });

  it("should trim and lowercase email before saving", async () => {
    const user = {
      ...baseUser,
      id: uuidv4(),
      email: "  USER@Example.COM  "
    };
    const result = await saveUser(user);
    expect(result.email).toBe("user@example.com");
  });

  it("should persist and retrieve the same user", async () => {

    const passwordHash = uuidv4();
    const baseUser = await createMockUser(uuidv4(),undefined,passwordHash);

    const query = `SELECT * FROM users WHERE id = $1`;

    const result = await pool.query(query, [baseUser.id]);
    expect(result.rows[0]).toMatchObject({
      id: baseUser.id,
      email: baseUser.email,
      password_hash: passwordHash
    });
  });
});
