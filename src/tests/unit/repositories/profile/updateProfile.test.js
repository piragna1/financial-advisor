import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.mjs";
import {
  createProfile,
  updateProfile,
} from "../../../../repositories/profileRepository.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";

describe("updateProfile(profile)", () => {
  beforeEach(async () => {
    resetDatabase();
    await pool.query("DELETE FROM profiles;");
    await pool.query("DELETE FROM users;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM profiles;");
    await pool.query("DELETE FROM users;");
  });

  it("should update all editable fields", async () => {
    console.log('should update all editable fields')
    const baseUser = await createMockUser(uuidv4());
    const userId = baseUser.id;
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Original",
      lastName: "Name",
      bio: "Original bio",
    };
    await createProfile(profile);
    const updated = {
      id: profile.id,
      userId,
      firstName: "Updated",
      lastName: "Surname",
      birthDate: "1995-05-05", // ← string plano
      location: "Buenos Aires",
      language: "es",
      avatarUrl: "https://updated.com/avatar.png",
      bio: "Updated bio",
    };

    const result = await updateProfile(updated);
    console.log('RESULT ->', result)
    console.log('RESULT.avatar_url ->', result['avatar_url'])
    console.log('RESULT.avatarUrl ->', result['avatarUrl'])

    expect(result['id']).toBe(profile.id)
    expect(result.user_id).toBe(profile.userId)
    expect(result.first_name).toBe(updated.firstName)
    expect(result.last_name).toBe(updated.lastName)
    expect(result.location).toBe(updated.location)
    expect(result.language).toBe(updated.language)
    expect(result.avatar_url).toBe(updated.avatarUrl)
    expect(result.bio).toBe(updated.bio)

    expect(new Date(result.birth_date).toISOString().slice(0, 10)).toBe(
      "1995-05-05"
    );
  });

  it("should trim string fields before updating", async () => {
    const userId = uuidv4();
    await createMockUser(userId);
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Trim ",
      lastName: "Test ",
      bio: "  T rim test ",
    };
    await createProfile(profile);

    const updated = {
      id: profile.id,
      userId,
      firstName: "  Trimmed  ",
      lastName: "  Surname  ",
      bio: "  Updated bio  ",
    };

    const result = await updateProfile(updated);
    expect(result.first_name).toBe("Trimmed");
    expect(result.last_name).toBe("Surname");
    expect(result.bio).toBe("Updated bio");
  });

  it("should default missing optional fields to null or 'en'", async () => {

    const baseUser = await createMockUser(uuidv4());

    const profile = {
      id: uuidv4(),
      userId: baseUser.id,
      firstName: "Minimal",
      lastName: "User",
      bio: "Minimal bio",
    };

    const baseProfile = await createProfile(profile);

    const updated = {
      id: baseProfile.id,
      userId: profile.userId,
      firstName: "Minimal",
      lastName: "User",
    };

    const result = await updateProfile(updated);

    expect(result.language).toBe("en");
    expect(result.birth_date).toBeNull();
    expect(result.location).toBeNull();
    expect(result.avatar_url).toBeNull();
    expect(result.bio).toBeNull();
  });

  it("should throw INVALID_INPUT if profile is null", async () => {
    await expect(updateProfile(null)).rejects.toMatchObject({
      code: "PROFILE_UPDATE_INVALID_INPUT",
    });
  });

  it("should throw INVALID_ID if id is missing", async () => {
    const profile = {
      firstName: "No ID",
      lastName: "User",
      bio: "Missing ID",
    };

    await expect(updateProfile(profile)).rejects.toMatchObject({
      code: "PROFILE_UPDATE_INVALID_ID",
    });
  });

  it("should throw NOT_FOUND if profile does not exist", async () => {
    const profile = {
      id: uuidv4(),
      firstName: "Ghost",
      lastName: "User",
      bio: "Does not exist",
    };

    await expect(updateProfile(profile)).rejects.toMatchObject({
      code: "PROFILE_UPDATE_NOT_FOUND",
      message: "Profile not found",
      status: 404,
    });
  });
});
