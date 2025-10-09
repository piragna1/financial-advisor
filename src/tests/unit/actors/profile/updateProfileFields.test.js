/*
export function updateProfileFields(profile,updates){
    const allowed = ['firstName', 'lastName', 'birthDate','location','language','avatarUrl','bio'];
    const sanitized = {};
    for (const key of allowed){
        if (key in updates){
            sanitized[key] = updates[key];
        }
    }
    if (Object.keys(sanitized).length === 0)
        throw new Error("No valid fields to update.");
    return {
        ...profile,
        ...sanitized,
        updatedAt:Date.now()
    }
}
*/

// src/tests/unit/actors/profile/updateProfileFields.test.js

import { updateProfileFields } from "../../../../src/actors/profile/updateProfileFields.js";

describe("updateProfileFields(profile, updates)", () => {
  it("updates allowed fields correctly", () => {
    const profile = { id: "user-001", firstName: "Ana", bio: "Old bio", updatedAt: 0 };
    const updates = { firstName: "Clara", bio: "New bio" };

    const result = updateProfileFields(profile, updates);

    expect(result.firstName).toBe("Clara");
    expect(result.bio).toBe("New bio");
    expect(result.id).toBe("user-001");
    expect(typeof result.updatedAt).toBe("number");
    expect(result.updatedAt).toBeGreaterThan(0);
  });

  it("ignores fields not in 'allowed'", () => {
    const profile = { id: "user-002", location: "AR", updatedAt: 0 };
    const updates = { email: "clara@example.com", password: "123456", location: "BR" };

    const result = updateProfileFields(profile, updates);

    expect(result.location).toBe("BR");
    expect(result).not.toHaveProperty("email");
    expect(result).not.toHaveProperty("password");
  });

  it("throws error when no valid fields are provided", () => {
    const profile = { id: "user-003", language: "es" };
    const updates = { email: "clara@example.com", password: "123456" };

    expect(() => updateProfileFields(profile, updates)).toThrow("No valid fields to update.");
  });

  it("does not mutate original profile", () => {
    const profile = { id: "user-004", avatarUrl: "old.png", updatedAt: 0 };
    const updates = { avatarUrl: "new.png" };

    const result = updateProfileFields(profile, updates);

    expect(profile.avatarUrl).toBe("old.png");
    expect(result.avatarUrl).toBe("new.png");
  });

  it("preserves fields not being updated", () => {
    const profile = { id: "user-005", firstName: "Ana", lastName: "Lopez", bio: "Bio" };
    const updates = { bio: "Updated bio" };

    const result = updateProfileFields(profile, updates);

    expect(result.firstName).toBe("Ana");
    expect(result.lastName).toBe("Lopez");
    expect(result.bio).toBe("Updated bio");
  });
});