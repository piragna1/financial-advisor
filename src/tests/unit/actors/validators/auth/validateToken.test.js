// import { AppError } from "../../../errors/AppError.js";
// import { AuthErrors } from "../../../errors/authErrors.js";

// export function validateToken(token) {
//   //not a string or empty string
//   if (typeof token !== "string" || token.trim() === "") {
//     throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN, "Missing or empty token");
//   }

//   const trimmed = token.trim();
//   //normalize 'Bearer'
//   const normalized = trimmed.startsWith("Bearer ") ? trimmed.slice(7).trim() : trimmed;

//   //split
//   const parts = normalized.split(".");
//   if (parts.length !== 3) {
//     throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN, "Token must have 3 parts");
//   }

//   //regex
//   const base64urlRegex = /^[A-Za-z0-9\-_]+$/;
//   if (!parts.every((p) => base64urlRegex.test(p))) {
//     throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN, "Token parts must be base64url-safe");
//   }

//   //expected length
//   if (normalized.length < 32) {
//     throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN, "Token is too short");
//   }

//   return true;
// }
import { validateToken } from "../../../../../actors/validators/auth/validateToken.js";
import { AppError } from "../../../../../errors/AppError.js";
import { AuthErrors } from "../../../../../errors/authErrors.js";

describe("validateToken(token)", () => {
  describe("valid tokens", () => {
    it("returns true for a valid JWT", () => {
      const token = "abc123.def456.ghi789";
      expect(validateToken(token)).toBe(true);
    });

    it("returns true for a valid JWT with Bearer prefix", () => {
      const token = "Bearer abc123.def456.ghi789";
      expect(validateToken(token)).toBe(true);
    });

    it("returns true for a valid JWT with hyphens and underscores", () => {
      const token = "abc-def_123.XYZ-456_qwe.789-ghi";
      expect(validateToken(token)).toBe(true);
    });
  });

  describe("invalid tokens", () => {
    it("throws if token is not a string", () => {
      expect(() => validateToken(123)).toThrow(AppError);
      try {
        validateToken(123);
      } catch (err) {
        expect(err.code).toBe(AuthErrors.TOKEN.INVALID_TOKEN.code);
        expect(err.details).toMatch(/Missing or empty token/);
      }
    });

    it("throws if token is empty", () => {
      expect(() => validateToken("")).toThrow(AppError);
      try {
        validateToken("");
      } catch (err) {
        expect(err.code).toBe(AuthErrors.TOKEN.INVALID_TOKEN.code);
        expect(err.details).toMatch(/Missing or empty token/);
      }
    });

    it("throws if token is only whitespace", () => {
      expect(() => validateToken("   ")).toThrow(AppError);
      try {
        validateToken("   ");
      } catch (err) {
        expect(err.code).toBe(AuthErrors.TOKEN.INVALID_TOKEN.code);
        expect(err.details).toMatch(/Missing or empty token/);
      }
    });

    it("throws if token has fewer than 3 parts", () => {
      expect(() => validateToken("abc.def")).toThrow(AppError);
      try {
        validateToken("abc.def");
      } catch (err) {
        expect(err.code).toBe(AuthErrors.TOKEN.INVALID_TOKEN.code);
        expect(err.details).toMatch(/must have 3 parts/);
      }
    });

    it("throws if token has invalid characters", () => {
      expect(() => validateToken("abc$%.def@!.ghi^&")).toThrow(AppError);
      try {
        validateToken("abc$%.def@!.ghi^&");
      } catch (err) {
        expect(err.code).toBe(AuthErrors.TOKEN.INVALID_TOKEN.code);
        expect(err.details).toMatch(/base64url-safe/);
      }
    });

    it("throws if token is too short", () => {
      expect(() => validateToken("a.b.c")).toThrow(AppError);
      try {
        validateToken("a.b.c");
      } catch (err) {
        expect(err.code).toBe(AuthErrors.TOKEN.INVALID_TOKEN.code);
        expect(err.details).toMatch(/too short/);
      }
    });
  });
});