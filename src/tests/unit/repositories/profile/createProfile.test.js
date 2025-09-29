import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../../db/pool.js";
import { createMockUser } from "../../../../actors/users/createMockUser.js";
import { createProfile } from "../../../../repositories/profileRepository.js";

describe("createProfile(profile)", () => {
  beforeEach(async () => {
    await pool.query("DELETE FROM profiles;");
    await pool.query("DELETE FROM users;");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM profiles;");
    await pool.query("DELETE FROM users;");
  });

  it("should create and return a valid profile", async () => {
    const baseProfile = {
      id: uuidv4(),
      userId: uuidv4(),
      firstName: "Gonzalo",
      lastName: "Backend",
      birthDate: new Date("1990-01-01"),
      location: "Mar del Plata",
      language: "es",
      avatarUrl: "https://example.com/avatar.png",
      bio: "Backend architect and systems thinker"
    };

    await createMockUser(baseProfile.userId);
    const result = await createProfile(baseProfile);

    expect(result).toMatchObject({
      id: baseProfile.id,
      user_id: baseProfile.userId,
      first_name: baseProfile.firstName,
      last_name: baseProfile.lastName,
      bio: baseProfile.bio,
      location: baseProfile.location,
      language: baseProfile.language,
      avatar_url: baseProfile.avatarUrl
    });
  });

  it("should default optional fields to null or 'en'", async () => {
    const minimal = {
      id: uuidv4(),
      userId: uuidv4(),
      firstName: "Minimal",
      lastName: "User",
      bio: "Just the basics"
    };

    await createMockUser(minimal.userId);
    const result = await createProfile(minimal);

    expect(result.language).toBe("en");
    expect(result.birth_date).toBeNull();
    expect(result.location).toBeNull();
    expect(result.avatar_url).toBeNull();
  });

  it("should throw INVALID_INPUT if profile is null", async () => {
    await expect(createProfile(null)).rejects.toMatchObject({
      code: "PROFILE_CREATE_INVALID_INPUT"
    });
  });

  it("should throw INVALID_ID if id is missing", async () => {
    const profile = {
      userId: uuidv4(),
      firstName: "Gonzalo",
      lastName: "Backend",
      bio: "Missing ID"
    };

    await createMockUser(profile.userId);
    await expect(createProfile(profile)).rejects.toMatchObject({
      code: "PROFILE_CREATE_INVALID_ID"
    });
  });

  it("should throw INVALID_USER_ID if userId is missing", async () => {
    const profile = {
      id: uuidv4(),
      firstName: "Gonzalo",
      lastName: "Backend",
      bio: "Missing userId"
    };

    await expect(createProfile(profile)).rejects.toMatchObject({
      code: "PROFILE_CREATE_INVALID_USER_ID"
    });
  });

  it("should throw INVALID_FIRST_NAME if firstName is missing", async () => {
    const profile = {
      id: uuidv4(),
      userId: uuidv4(),
      lastName: "Backend",
      bio: "Missing firstName"
    };

    await createMockUser(profile.userId);
    await expect(createProfile(profile)).rejects.toMatchObject({
      code: "PROFILE_CREATE_INVALID_FIRST_NAME"
    });
  });

  it("should throw INVALID_LAST_NAME if lastName is missing", async () => {
    const profile = {
      id: uuidv4(),
      userId: uuidv4(),
      firstName: "Gonzalo",
      bio: "Missing lastName"
    };

    await createMockUser(profile.userId);
    await expect(createProfile(profile)).rejects.toMatchObject({
      code: "PROFILE_CREATE_INVALID_LAST_NAME"
    });
  });

  it("should throw INVALID_BIO if bio is missing", async () => {
    const profile = {
      id: uuidv4(),
      userId: uuidv4(),
      firstName: "Gonzalo",
      lastName: "Backend"
    };

    await createMockUser(profile.userId);
    await expect(createProfile(profile)).rejects.toMatchObject({
      code: "PROFILE_CREATE_INVALID_BIO"
    });
  });

  it("should trim string fields before inserting", async () => {
    const profile = {
      id: uuidv4(),
      userId: uuidv4(),
      firstName: "  Gonzalo  ",
      lastName: "  Backend  ",
      bio: "  Architect  "
    };

    await createMockUser(profile.userId);
    const result = await createProfile(profile);

    expect(result.first_name).toBe("Gonzalo");
    expect(result.last_name).toBe("Backend");
    expect(result.bio).toBe("Architect");
  });
});
