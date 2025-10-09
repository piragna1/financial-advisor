/*export function hasWhiteSpaces(input){
    return /\s/.test(input); // includes tabs, newlines, NBSP, etc.
}
*/

// src/tests/unit/utils/hasWhiteSpaces.test.js

import { hasWhiteSpaces } from "../../../src/utils/hasWhiteSpaces.js";

describe("hasWhiteSpaces(input)", () => {
  it("returns true for space character", () => {
    expect(hasWhiteSpaces("hello world")).toBe(true);
  });

  it("returns true for tab character", () => {
    expect(hasWhiteSpaces("hello\tworld")).toBe(true);
  });

  it("returns true for newline character", () => {
    expect(hasWhiteSpaces("hello\nworld")).toBe(true);
  });

  it("returns true for carriage return", () => {
    expect(hasWhiteSpaces("hello\rworld")).toBe(true);
  });

  it("returns true for non-breaking space (NBSP)", () => {
    expect(hasWhiteSpaces("hello\u00A0world")).toBe(true);
  });

  it("returns false for string without whitespace", () => {
    expect(hasWhiteSpaces("helloworld")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(hasWhiteSpaces("")).toBe(false);
  });

  it("throws if input is not a string", () => {
    expect(() => hasWhiteSpaces(null)).toThrow();
    expect(() => hasWhiteSpaces(undefined)).toThrow();
    expect(() => hasWhiteSpaces(123)).toThrow();
    expect(() => hasWhiteSpaces({})).toThrow();
  });
});