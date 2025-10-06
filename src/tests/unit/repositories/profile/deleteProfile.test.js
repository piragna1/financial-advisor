import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  createProfile,
  deleteProfile
} from "../../../../repositories/profileRepository.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("deleteProfile(id)", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
  });

  it("should delete the profile and return it", async () => {
    const userId = uuidv4();
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Delete",
      lastName: "Me",
      bio: "To be deleted"
    };

    await createMockUser(userId);
    await createProfile(profile);

    const result = await deleteProfile(profile.id);
    expect(result).toMatchObject({
      id: profile.id,
      user_id: userId,
      first_name: profile.firstName,
      last_name: profile.lastName,
      bio: profile.bio
    });

    const check = await pool.query("SELECT * FROM profiles WHERE id = $1", [profile.id]);
    expect(check.rowCount).toBe(0);
  });

  it("should throw INVALID_ID if id is null", async () => {
    await expect(deleteProfile(null)).rejects.toMatchObject({
      code: "PROFILE_DELETE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if id is undefined", async () => {
    await expect(deleteProfile(undefined)).rejects.toMatchObject({
      code: "PROFILE_DELETE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if id is empty string", async () => {
    await expect(deleteProfile("")).rejects.toMatchObject({
      code: "PROFILE_DELETE_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if id is not a string", async () => {
    await expect(deleteProfile(123)).rejects.toMatchObject({
      code: "PROFILE_DELETE_INVALID_ID"
    });
  });

  it("should throw NOT_FOUND if profile does not exist", async () => {
    await expect(deleteProfile(uuidv4())).rejects.toMatchObject({
      code: "PROFILE_DELETE_NOT_FOUND"
    });
  });

  it("should not affect other profiles", async () => {
    const userA = uuidv4();
    const userB = uuidv4();

    const profileA = {
      id: uuidv4(),
      userId: userA,
      firstName: "User",
      lastName: "A",
      bio: "Bio A"
    };

    const profileB = {
      id: uuidv4(),
      userId: userB,
      firstName: "User",
      lastName: "B",
      bio: "Bio B"
    };

    await createMockUser(userA);
    console.log('user A', userA)
    await createMockUser(userB);
    console.log('user B', userB)
    await createProfile(profileA);
    await createProfile(profileB);

    await deleteProfile(profileA.id);

    const remaining = await pool.query("SELECT * FROM profiles WHERE id = $1", [profileB.id]);
    expect(remaining.rowCount).toBe(1);
    expect(remaining.rows[0].bio).toBe("Bio B");
  });


});
