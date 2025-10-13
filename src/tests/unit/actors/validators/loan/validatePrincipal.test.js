import { validatePrincipal } from "../../../../../actors/validators/loan/validatePrincipal.js";
import { AppError } from "../../../../../errors/AppError.js";
import { LoanErrors } from "../../../../../errors/loanErrors.js";

describe("validatePrincipal(principal)", () => {
  describe("valid inputs", () => {
    it("accepts positive integer", () => {
      expect(() => validatePrincipal(1000)).not.toThrow();
    });

    it("accepts positive float", () => {
      expect(() => validatePrincipal(0.01)).not.toThrow();
    });

    it("accepts zero", () => {
      expect(() => validatePrincipal(0)).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws INVALID_PRINCIPAL for string", () => {
      expect(() => validatePrincipal("1000")).toThrow(AppError);
      try {
        validatePrincipal("1000");
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PRINCIPAL.code);
      }
    });

    it("throws INVALID_PRINCIPAL.code for null", () => {
      expect(() => validatePrincipal(null)).toThrow(AppError);
      try {
        validatePrincipal(null);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PRINCIPAL.code);
      }
    });

    it("throws INVALID_PRINCIPAL.code for undefined", () => {
      expect(() => validatePrincipal(undefined)).toThrow(AppError);
      try {
        validatePrincipal(undefined);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PRINCIPAL.code);
      }
    });

    it("throws INVALID_PRINCIPAL.code for NaN", () => {
      expect(() => validatePrincipal(NaN)).toThrow(AppError);
      try {
        validatePrincipal(NaN);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PRINCIPAL.code);
      }
    });

    it("throws INVALID_PRINCIPAL.code for object", () => {
      expect(() => validatePrincipal({})).toThrow(AppError);
      try {
        validatePrincipal({});
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PRINCIPAL.code);
      }
    });

    it("throws INVALID_PRINCIPAL.code for array", () => {
      expect(() => validatePrincipal([1000])).toThrow(AppError);
      try {
        validatePrincipal([1000]);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PRINCIPAL.code);
      }
    });
  });
});