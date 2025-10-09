// export function hasControlChars(input){
//     return /[\x00-\x1F\x7F]/.test(input);
// }

// src/tests/unit/utils/hasControlChars.test.js

import { hasControlChars } from "../../../../actors/utils/hasControlChars.js";

describe("hasControlChars(input)", () => {
  it("returns true for newline character", () => {
    expect(hasControlChars("Hello\nWorld")).toBe(true);
  });

  it("returns true for tab character", () => {
    expect(hasControlChars("Hello\tWorld")).toBe(true);
  });

  it("returns true for carriage return", () => {
    expect(hasControlChars("Hello\rWorld")).toBe(true);
  });

  it("returns true for null byte", () => {
    expect(hasControlChars("Hello\u0000World")).toBe(true);
  });

  it("returns true for DEL character", () => {
    expect(hasControlChars("Hello\u007FWorld")).toBe(true);
  });

  it("returns false for clean string", () => {
    expect(hasControlChars("Hello World")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(hasControlChars("")).toBe(false);
  });

  it("throws if input is not a string", () => {
    expect(() => hasControlChars(null)).toThrow();
    expect(() => hasControlChars(undefined)).toThrow();
    expect(() => hasControlChars(123)).toThrow();
    expect(() => hasControlChars({})).toThrow();
  });
});