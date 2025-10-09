/*import { AppError } from "../../errors/AppError.js";
import { AuthErrors } from "../../errors/authErrors.js";

export function validatePayloadStructure(payload) {
  if (!payload || typeof payload !== "object") {
    throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
  }
  const { sub, iat, exp } = payload;

  if (!sub || typeof sub !== "string" || sub.trim() === "")
    throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);

  if (!iat || typeof iat !== "number" || iat === Infinity || iat <0)
    throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);

  if (!exp || typeof exp !== "number" || exp === Infinity || exp<0)
    throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);

  return true;
}
*/

// src/tests/unit/validators/validatePayloadStructure.test.js

import { validatePayloadStructure } from "../../../../actors/auth/validatePayloadStructure.js";
import { AppError } from "../../../../errors/AppError";
import { AuthErrors } from "../../../../errors/authErrors";

describe("validatePayloadStructure(payload)", () => {
  it("returns true for a valid payload", () => {
    const payload = {
      sub: "user-123",
      iat: 1690000000,
      exp: 1699999999
    };
    expect(validatePayloadStructure(payload)).toBe(true);
  });

  it("throws INVALID_PAYLOAD if payload is missing", () => {
    expect(() => validatePayloadStructure(undefined)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if payload is not an object", () => {
    expect(() => validatePayloadStructure("not-an-object")).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if sub is missing", () => {
    const payload = { iat: 1690000000, exp: 1699999999 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if sub is not a string", () => {
    const payload = { sub: 123, iat: 1690000000, exp: 1699999999 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if sub is empty", () => {
    const payload = { sub: "   ", iat: 1690000000, exp: 1699999999 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if iat is missing", () => {
    const payload = { sub: "user-123", exp: 1699999999 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if iat is not a number", () => {
    const payload = { sub: "user-123", iat: "not-a-number", exp: 1699999999 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if iat is negative", () => {
    const payload = { sub: "user-123", iat: -100, exp: 1699999999 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if iat is Infinity", () => {
    const payload = { sub: "user-123", iat: Infinity, exp: 1699999999 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if exp is missing", () => {
    const payload = { sub: "user-123", iat: 1690000000 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if exp is not a number", () => {
    const payload = { sub: "user-123", iat: 1690000000, exp: "not-a-number" };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if exp is negative", () => {
    const payload = { sub: "user-123", iat: 1690000000, exp: -1 };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });

  it("throws INVALID_PAYLOAD if exp is Infinity", () => {
    const payload = { sub: "user-123", iat: 1690000000, exp: Infinity };
    expect(() => validatePayloadStructure(payload)).toThrow(AuthErrors.TOKEN.INVALID_PAYLOAD);
  });
});