import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  createProfile,
  getProfileByUserId
} from "../../../../repositories/profileRepository.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("getProfileByUserId(userId)", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await pool.query("DELETE FROM profiles;");
    await pool.query("DELETE FROM users;");
  });

  it("should return the profile for a valid userId", async () => {
    const userId = uuidv4();
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Gonzalo",
      lastName: "Backend",
      bio: "Architect"
    };

    await createMockUser(userId);
    await createProfile(profile);

    const result = await getProfileByUserId(userId);
    expect(result).toMatchObject({
      user_id: userId,
      first_name: profile.firstName,
      last_name: profile.lastName,
      bio: profile.bio
    });
  });

  it("should throw INVALID_ID if userId is null", async () => {
    await expect(getProfileByUserId(null)).rejects.toMatchObject({
      code: "PROFILE_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is undefined", async () => {
    await expect(getProfileByUserId(undefined)).rejects.toMatchObject({
      code: "PROFILE_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is an empty string", async () => {
    await expect(getProfileByUserId("")).rejects.toMatchObject({
      code: "PROFILE_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if userId is not a string", async () => {
    await expect(getProfileByUserId(123)).rejects.toMatchObject({
      code: "PROFILE_READ_INVALID_ID"
    });
  });

  it("should throw NOT_FOUND if user exists but has no profile", async () => {
    const userId = uuidv4();
    await createMockUser(userId);
    await expect(getProfileByUserId(userId)).rejects.toMatchObject({
      code: "PROFILE_READ_NOT_FOUND"
    });
  });

  it("should throw NOT_FOUND if user does not exist", async () => {
    const userId = uuidv4();
    await expect(getProfileByUserId(userId)).rejects.toMatchObject({
      code: "PROFILE_READ_NOT_FOUND"
    });
  });

  it("should return trimmed userId match", async () => {
    const userId = uuidv4();
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Trim",
      lastName: "Test",
      bio: "Trimmed input"
    };

    await createMockUser(userId);
    await createProfile(profile);

    const result = await getProfileByUserId(`  ${userId}  `);
    expect(result.user_id).toBe(userId);
  });

  it("should return correct profile when multiple users exist", async () => {
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
    await createMockUser(userB);
    await createProfile(profileA);
    await createProfile(profileB);

    const resultA = await getProfileByUserId(userA);
    const resultB = await getProfileByUserId(userB);

    expect(resultA.bio).toBe("Bio A");
    expect(resultB.bio).toBe("Bio B");
  });

  it("should throw NOT_FOUND if profile was deleted", async () => {
    const userId = uuidv4();
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Deleted",
      lastName: "Profile",
      bio: "To be deleted"
    };

    await createMockUser(userId);
    await createProfile(profile);
    await pool.query("DELETE FROM profiles WHERE user_id = $1", [userId]);

    await expect(getProfileByUserId(userId)).rejects.toMatchObject({
      code: "PROFILE_READ_NOT_FOUND"
    });
  });

  it("should throw NOT_FOUND if user was deleted (cascade)", async () => {
    const userId = uuidv4();
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Cascade",
      lastName: "Gone",
      bio: "Cascade test"
    };

    await createMockUser(userId);
    await createProfile(profile);
    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    await expect(getProfileByUserId(userId)).rejects.toMatchObject({
      code: "PROFILE_READ_NOT_FOUND"
    });
  });
});
