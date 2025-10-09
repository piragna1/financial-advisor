/*
export function normalizeEmail(email){
    return email.toLocaleLowerCase();
}
*/
// src/tests/unit/utils/normalizeEmail.test.js

import { normalizeEmail } from "../../../../actors/users/normalizeEmail.js";

describe("normalizeEmail(email)", () => {
  it("converts uppercase email to lowercase", () => {
    const input = "USER@EXAMPLE.COM";
    const result = normalizeEmail(input);
    expect(result).toBe("user@example.com");
  });

  it("preserves already lowercase email", () => {
    const input = "user@example.com";
    const result = normalizeEmail(input);
    expect(result).toBe("user@example.com");
  });

  it("handles mixed-case emails", () => {
    const input = "UsEr@ExAmPlE.CoM";
    const result = normalizeEmail(input);
    expect(result).toBe("user@example.com");
  });

  it("does not alter special characters", () => {
    const input = "user.name+tag@Example.COM";
    const result = normalizeEmail(input);
    expect(result).toBe("user.name+tag@example.com");
  });

  it("throws if input is not a string", () => {
    expect(() => normalizeEmail(null)).toThrow();
    expect(() => normalizeEmail(undefined)).toThrow();
    expect(() => normalizeEmail(123)).toThrow();
    expect(() => normalizeEmail({})).toThrow();
  });
});