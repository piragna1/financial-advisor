/* 
export function extractToken(req){
    return req.headers.authorization;
}
*/
// src/tests/unit/helpers/extractToken.test.js

import { extractToken } from "../../../../actors/auth/extractToken";

describe("extractToken(req)", () => {
  it("returns the authorization token when present", () => {
    const req = {
      headers: {
        authorization: "Bearer abc123"
      }
    };

    const token = extractToken(req);
    expect(token).toBe("Bearer abc123");
  });

  it("returns undefined when authorization header is missing", () => {
    const req = {
      headers: {}
    };

    const token = extractToken(req);
    expect(token).toBeUndefined();
  });

  it("returns undefined when headers object is missing", () => {
    const req = {};
    const token = extractToken(req);
    expect(token).toBeUndefined();
  });

  it("returns empty string if authorization header is empty", () => {
    const req = {
      headers: {
        authorization: ""
      }
    };

    const token = extractToken(req);
    expect(token).toBe("");
  });
});