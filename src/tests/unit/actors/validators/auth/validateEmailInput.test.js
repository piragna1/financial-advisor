// import { AppError } from "../../../errors/AppError.js";
// import { AuthErrors } from "../../../errors/authErrors.js";

// export function validateEmailInput(email) {
//   if (!email) {
//     throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Email is required');
//   } else {
//     if (email && typeof email !== "string") {
//       throw new AppError(AuthErrors.INVALID_INPUT, 'Email must be a string')
//     } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
//       throw new AppError(AuthErrors.INVALID_INPUT, 'Email must be a string')
//     }
//   }
//   return true;
// }

// src/tests/unit/actors/auth/validateEmailInput.test.js

import { validateEmailInput } from "../../../../../actors/validators/auth/validateEmailInput.js";
import { AppError } from "../../../../../errors/AppError.js";
import { AuthErrors } from "../../../../../errors/authErrors.js";

describe("validateEmailInput(email)", () => {
  it("throws MISSING_CREDENTIALS if email is falsy", () => {
    expect(() => validateEmailInput(null)).toThrow();
    expect(() => validateEmailInput(undefined)).toThrow();
    expect(() => validateEmailInput("")).toThrow();

    try {
      validateEmailInput("");
    } catch (err) {
      expect(err.code).toBe(AuthErrors.MISSING_CREDENTIALS);
      expect(err.message).toBe("Email is required");
    }
  });

  it("throws INVALID_INPUT if email is not a string", () => {
    expect(() => validateEmailInput(123)).toThrow();
    expect(() => validateEmailInput({})).toThrow();

    try {
      validateEmailInput(123);
    } catch (err) {
      expect(err.code).toBe(AuthErrors.INVALID_INPUT);
      expect(err.message).toBe("Email must be a string");
    }
  });

  it("throws INVALID_INPUT if email format is invalid", () => {
    expect(() => validateEmailInput("invalid-email")).toThrow();
    expect(() => validateEmailInput("user@com")).toThrow();
    expect(() => validateEmailInput("user@.com")).toThrow();
  });

  it("returns true for valid email", () => {
    expect(validateEmailInput("user@example.com")).toBe(true);
    expect(validateEmailInput("clara.dev@domain.co")).toBe(true);
  });
});