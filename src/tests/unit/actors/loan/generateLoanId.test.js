/*
import { v4 } from 'uuid';

export function generateLoanId() {
  return v4();
}
*/
// src/tests/unit/actors/loan/generateLoanId.test.js

import { generateLoanId } from "../../../../actors/loan/generateLoanId.js";

describe("generateLoanId()", () => {
  it("returns a string", () => {
    const id = generateLoanId();
    expect(typeof id).toBe("string");
  });

  it("returns a valid UUID v4 format", () => {
    const id = generateLoanId();
    const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(uuidV4Regex.test(id)).toBe(true);
  });

  it("returns unique values across multiple calls", () => {
    const ids = new Set();
    for (let i = 0; i < 100; i++) {
      ids.add(generateLoanId());
    }
    expect(ids.size).toBe(100);
  });
});