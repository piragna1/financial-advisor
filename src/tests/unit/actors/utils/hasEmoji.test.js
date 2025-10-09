// export function hasEmoji(input){
//     const emojiRegex =/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
//     return emojiRegex.test(input);
// }
// src/tests/unit/utils/hasEmoji.test.js

import { hasEmoji } from "../../../../actors/utils/hasEmoji.js";

describe("hasEmoji(input)", () => {
  it("returns true for smiley emoji", () => {
    expect(hasEmoji("Hello 😊")).toBe(true);
  });

  it("returns true for rocket emoji", () => {
    expect(hasEmoji("Launching 🚀")).toBe(true);
  });

  it("returns true for earth emoji", () => {
    expect(hasEmoji("Planet 🌍")).toBe(true);
  });

  it("returns true for heart emoji", () => {
    expect(hasEmoji("Love ❤️")).toBe(true);
  });

  it("returns true for flag emoji", () => {
    expect(hasEmoji("Argentina 🇦🇷")).toBe(true);
  });

  it("returns false for plain text", () => {
    expect(hasEmoji("Just text")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(hasEmoji("")).toBe(false);
  });

  it("throws if input is not a string", () => {
    expect(() => hasEmoji(null)).toThrow();
    expect(() => hasEmoji(undefined)).toThrow();
    expect(() => hasEmoji(123)).toThrow();
    expect(() => hasEmoji({})).toThrow();
  });
});