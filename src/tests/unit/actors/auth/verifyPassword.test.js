/*function verifyPassword(hash1, hash2) {
  return hash1===hash2;
}*/

// src/tests/unit/validators/verifyPassword.test.js

import {verifyPassword} from '../../../../actors/auth/verifyPassword.js';

describe("verifyPassword(hash1, hash2)", () => {
  it("returns true when hashes are equal", () => {
    expect(verifyPassword("abc123", "abc123")).toBe(true);
  });

  it("returns false when hashes are different", () => {
    expect(verifyPassword("abc123", "xyz789")).toBe(false);
  });

  it("returns false when one hash is empty", () => {
    expect(verifyPassword("", "abc123")).toBe(false);
    expect(verifyPassword("abc123", "")).toBe(false);
  });

  it("returns false when both hashes are empty", () => {
    expect(verifyPassword("", "")).toBe(false);
  });

  it("returns false when one hash is null or undefined", () => {
    expect(verifyPassword(null, "abc123")).toBe(false);
    expect(verifyPassword("abc123", undefined)).toBe(false);
  });

  it("returns false when both hashes are null", () => {
    expect(verifyPassword(null, null)).toBe(false);
  });

  it("returns false when hashes are of different types", () => {
    expect(verifyPassword("123", 123)).toBe(false);
  });
});