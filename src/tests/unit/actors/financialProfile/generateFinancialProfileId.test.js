/*import { v4 } from "uuid";

export function generateFinancialProfileId(){
    return v4();
} */

import { generateFinancialProfileId } from "../../../../actors/financialProfile/generateFinancialProfileId";

// src/tests/unit/actors/financialProfile/generateFinancialProfileId.test.js

describe("generateFinancialProfileId()", () => {
  it("returns a string", () => {
    const id = generateFinancialProfileId();
    expect(typeof id).toBe("string");
  });

  it("returns a valid UUID v4 format", () => {
    const id = generateFinancialProfileId();
    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidV4Regex.test(id)).toBe(true);
  });

  it("returns unique values across multiple calls", () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateFinancialProfileId());
    }
    expect(ids.size).toBe(100);
  });
});
