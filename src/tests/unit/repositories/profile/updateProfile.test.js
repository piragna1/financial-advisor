import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";
import {
  createProfile,
  updateProfile,
} from "../../../../repositories/profileRepository.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";

describe("updateProfile(profile)", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM profiles;");
    await pool.query("DELETE FROM users;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM profiles;");
    await pool.query("DELETE FROM users;");
    await pool.end();
  });

  it("should update all editable fields", async () => {
    const userId = uuidv4();
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Original",
      lastName: "Name",
      bio: "Original bio",
    };

    await createMockUser(userId);
    await createProfile(profile);

    const updated = {
  id: profile.id,
  firstName: "Updated",
  lastName: "Surname",
  birthDate: "1995-05-05", // ← string plano
  location: "Buenos Aires",
  language: "es",
  avatarUrl: "https://updated.com/avatar.png",
  bio: "Updated bio"
};

const result = await updateProfile(updated);

expect(result).toMatchObject({
  id: profile.id,
  first_name: "Updated",
  last_name: "Surname",
  location: "Buenos Aires",
  language: "es",
  avatar_url: "https://updated.com/avatar.png",
  bio: "Updated bio"
});

expect(new Date(result.birth_date).toISOString().slice(0, 10)).toBe("1995-05-05");


  });

  it("should trim string fields before updating", async () => {
    const userId = uuidv4();
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Trim",
      lastName: "Test",
      bio: "Trim test",
    };

    await createMockUser(userId);
    await createProfile(profile);

    const updated = {
      id: profile.id,
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
    const userId = uuidv4();
    const profile = {
      id: uuidv4(),
      userId,
      firstName: "Minimal",
      lastName: "User",
      bio: "Minimal bio",
    };

    await createMockUser(userId);
    await createProfile(profile);

    const updated = {
      id: profile.id,
      firstName: "Minimal",
      lastName: "User",
      bio: "Still minimal",
    };

    const result = await updateProfile(updated);
    expect(result.language).toBe("en");
    expect(result.birth_date).toBeNull();
    expect(result.location).toBeNull();
    expect(result.avatar_url).toBeNull();
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
    });
  });
});
