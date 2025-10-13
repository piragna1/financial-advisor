import { buildProfileEntity } from "../../../entities/profileEntity.js";

describe("buildProfileEntity(data)", () => {
  describe("valid inputs", () => {
    it("builds profile with all fields provided", () => {
      const input = {
        userId: "user-001",
        firstName: "Gonzalo",
        lastName: "Martínez",
        birthDate: "1990-05-15",
        location: "Mar del Plata",
        language: "es",
        avatarUrl: "https://example.com/avatar.jpg",
        bio: "Backend architect and CS2 trader",
      };

      const result = buildProfileEntity(input);
      expect(result).toMatchObject(input);
    });

    it("applies defaults when optional fields are missing", () => {
      const input = { userId: "user-002" };
      const result = buildProfileEntity(input);
      expect(result).toMatchObject({
        userId: "user-002",
        firstName: "Dear",
        lastName: "User",
        language: "en",
      });
    });

    it("omits optional fields when explicitly falsy", () => {
      const input = {
        userId: "user-003",
        firstName: "",
        lastName: null,
        birthDate: undefined,
        location: "",
        language: "",
        avatarUrl: null,
        bio: undefined,
      };

      const result = buildProfileEntity(input);
      expect(result).toMatchObject({ userId: "user-003" });
      expect(result).not.toHaveProperty("firstName");
      expect(result).not.toHaveProperty("lastName");
      expect(result).not.toHaveProperty("birthDate");
      expect(result).not.toHaveProperty("location");
      expect(result).not.toHaveProperty("language");
      expect(result).not.toHaveProperty("avatarUrl");
      expect(result).not.toHaveProperty("bio");
    });
  });

  describe("invalid inputs", () => {
    it("throws if userId is missing", () => {
      expect(() => buildProfileEntity({})).toThrow("User id missing.");
    });

    it("throws if input is null", () => {
      expect(() => buildProfileEntity(null)).toThrow("User is missing.");
    });

    it("throws if input is undefined", () => {
      expect(() => buildProfileEntity(undefined)).toThrow("User is missing.");
    });

    it("throws if userId is falsy", () => {
      expect(() => buildProfileEntity({ userId: "" })).toThrow("User id missing.");
    });
  });
});