// export function isNotSymbol(char){
//     // Check if the character is alphanumeric or a space
//   if (char == null || char === '') return true;
//   return /^[\p{L}'-]$/u.test(char);
// }


// src/tests/unit/utils/isNotSymbol.test.js
import { isNotSymbol } from "../../../../actors/utils/isNotSymbol.js";

describe("isNotSymbol(char)", () => {
  it("returns true for Latin letters", () => {
    expect(isNotSymbol("a")).toBe(true);
    expect(isNotSymbol("Z")).toBe(true);
  });

  it("returns true for accented letters", () => {
    expect(isNotSymbol("ñ")).toBe(true);
    expect(isNotSymbol("é")).toBe(true);
  });

  it("returns true for Unicode letters", () => {
    expect(isNotSymbol("中")).toBe(true); // Chinese
    expect(isNotSymbol("ع")).toBe(true); // Arabic
  });

  it("returns true for apostrophe and hyphen", () => {
    expect(isNotSymbol("'")).toBe(true);
    expect(isNotSymbol("-")).toBe(true);
  });

  it("returns false for symbols", () => {
    expect(isNotSymbol("@")).toBe(false);
    expect(isNotSymbol("#")).toBe(false);
    expect(isNotSymbol("!")).toBe(false);
    expect(isNotSymbol("*")).toBe(false);
    expect(isNotSymbol("&")).toBe(false);
  });

  it("returns false for digits", () => {
    expect(isNotSymbol("0")).toBe(false);
    expect(isNotSymbol("9")).toBe(false);
  });

  it("returns true for null and empty string", () => {
    expect(isNotSymbol(null)).toBe(true);
    expect(isNotSymbol("")).toBe(true);
  });

  it("returns true for whitespace", () => {
    expect(isNotSymbol(" ")).toBe(true);
    expect(isNotSymbol("\t")).toBe(true);
  });
});