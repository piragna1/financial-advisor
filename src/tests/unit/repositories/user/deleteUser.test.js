import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import { saveUser, deleteUser } from "../../../../repositories/userRepository.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("deleteUser(id)", () => {
  const baseUser = {
    id: uuidv4(),
    email: "delete@example.com",
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

  it("should delete the user if ID exists", async () => {
    await saveUser(baseUser);
    const result = await deleteUser(baseUser.id);
    expect(result).toMatchObject({
      id: baseUser.id,
      email: baseUser.email
    });

    const check = await pool.query("SELECT * FROM users WHERE id = $1", [baseUser.id]);
    expect(check.rowCount).toBe(0);
  });

  it("should throw USER_NOT_FOUND if ID does not exist", async () => {
    const fakeId = uuidv4();
    await expect(deleteUser(fakeId)).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should throw USER_NOT_FOUND if ID is null", async () => {
    await expect(deleteUser(null)).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should throw USER_NOT_FOUND if ID is undefined", async () => {
    await expect(deleteUser(undefined)).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should throw USER_NOT_FOUND if ID is a number", async () => {
    await expect(deleteUser(123)).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should throw USER_NOT_FOUND if ID is an object", async () => {
    await expect(deleteUser({ id: baseUser.id })).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should throw USER_NOT_FOUND if ID is an array", async () => {
    await expect(deleteUser([baseUser.id])).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should throw USER_NOT_FOUND if ID is empty string", async () => {
    await expect(deleteUser("")).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should throw USER_NOT_FOUND if ID is whitespace only", async () => {
    await expect(deleteUser("   ")).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND"
    });
  });

  it("should trim ID before deleting", async () => {
    await saveUser(baseUser);
    const result = await deleteUser(`  ${baseUser.id}  `);
    expect(result.id).toBe(baseUser.id);
  });
});
