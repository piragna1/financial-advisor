import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  saveUser,
  updateUser,
} from "../../../../repositories/userRepository.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";
import { hashPassword } from "../../../../utils/auth/hashPassword.js";

describe("updateUser(id, updates)", () => {
  const baseUser = {
    id: uuidv4(),
    email: "update@example.com",
    passwordHash: "hashed-password",
    createdAt: new Date(),
    updatedAt: null,
  };

  beforeEach(async () => {
    resetDatabase();
  });

  afterAll(async () => {
    await pool.query("DELETE FROM users;");
  });

  it("should update email and return updated user", async () => {
    const baseUser = await createMockUser(uuidv4());
    const result = await updateUser(baseUser.id, { email: "new@example.com" });
    expect(result.email).toBe("new@example.com");
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it("should update passwordHash and return updated user", async () => {

    const baseUser = await createMockUser(uuidv4());

    let newPass = hashPassword("new-pass")

    const result = await updateUser(baseUser.id, {
      passwordHash: newPass,
    });

    expect(result.passwordHash).toBe(newPass);
  });

  it("should update both email and passwordHash", async () => {
    const userId = uuidv4();
    const baseUser = await createMockUser(userId, "original@example.com");
if (!baseUser || !baseUser.id) {
  throw new Error("createMockUser did not return a valid user");
}
    const result = await updateUser(baseUser.id, {
      email: "combo@example.com",
      passwordHash: "combo-hash",
    });

    expect(result.email).toBe("combo@example.com");

    expect(result.passwordHash).toBe("combo-hash");
  });

  it("should throw USER_NOT_FOUND if ID does not exist", async () => {
    const fakeId = uuidv4();
    await expect(
      updateUser(fakeId, { email: "ghost@example.com" })
    ).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND",
    });
  });

  it("should throw INVALID_INPUT if updates is null", async () => {
    await expect(updateUser(baseUser.id, null)).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT",
    });
  });

  it("should throw INVALID_INPUT if updates is not an object", async () => {
    await expect(updateUser(baseUser.id, "invalid")).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT",
    });
  });

  it("should throw INVALID_INPUT if updates is an array", async () => {
    await expect(updateUser(baseUser.id, ["email"])).rejects.toMatchObject({
      code: "REGISTER_INVALID_INPUT",
    });
  });

  it("should throw INVALID_INPUT if updates has no valid fields", async () => {
    await expect(updateUser(baseUser.id, { foo: "bar" })).rejects.toMatchObject(
      {
        code: "REGISTER_INVALID_INPUT",
      }
    );
  });

  it("should throw USER_NOT_FOUND if ID is null", async () => {
    await expect(
      updateUser(null, { email: "null@example.com" })
    ).rejects.toMatchObject({
      code: "LOGIN_USER_NOT_FOUND",
    });
  });

  it("should trim ID before updating", async () => {
    console.log("should trim ID before updating");
    const baseUser = await createMockUser(uuidv4());
    console.log(baseUser)//suelta undefined aqui
    const result = await updateUser(`           ${baseUser.id}     `, {
      email: baseUser.email,
    });

    expect(result.email).toBe(baseUser.email);
  });
});
