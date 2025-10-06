import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  createProfile,
  getProfileById
} from "../../../../repositories/profileRepository.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";
import { resetDatabase } from "../../../helpers/resetDatabase.js";

describe("getProfileById(id)", () => {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await pool.query("DELETE FROM profiles;");
    await pool.query("DELETE FROM users;");
  });

  it("should return the profile for a valid id", async () => {
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

    const result = await getProfileById(profile.id);
    expect(result).toMatchObject({
      id: profile.id,
      user_id: userId,
      first_name: profile.firstName,
      last_name: profile.lastName,
      bio: profile.bio
    });
  });

  it("should throw INVALID_ID if id is null", async () => {
    await expect(getProfileById(null)).rejects.toMatchObject({
      code: "PROFILE_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if id is undefined", async () => {
    await expect(getProfileById(undefined)).rejects.toMatchObject({
      code: "PROFILE_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if id is empty string", async () => {
    await expect(getProfileById("")).rejects.toMatchObject({
      code: "PROFILE_READ_INVALID_ID"
    });
  });

  it("should throw INVALID_ID if id is not a string", async () => {
    await expect(getProfileById(123)).rejects.toMatchObject({
      code: "PROFILE_READ_INVALID_ID"
    });
  });

  it("should throw NOT_FOUND if profile does not exist", async () => {
    await expect(getProfileById(uuidv4())).rejects.toMatchObject({
      code: "PROFILE_READ_NOT_FOUND"
    });
  });

  it("should return trimmed id match", async () => {
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

    const result = await getProfileById(`  ${profile.id}  `);
    expect(result.id).toBe(profile.id);
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
    await createMockUser(userB);
    await createProfile(profileA);
    await createProfile(profileB);

    const result = await getProfileById(profileB.id);
    expect(result.bio).toBe("Bio B");
  });
});
