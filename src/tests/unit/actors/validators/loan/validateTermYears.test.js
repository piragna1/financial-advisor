import { validateTermYears } from "../../../../../actors/validators/loan/validateTermYears.js";
import { AppError } from "../../../../../errors/AppError.js";
import { LoanErrors } from "../../../../../errors/LoanErrors.js";
describe("validateTermYears(termYears)", () => {
  describe("valid inputs", () => {
    it("accepts positive integer", () => {
      expect(() => validateTermYears(5)).not.toThrow();
    });

    it("accepts positive float", () => {
      expect(() => validateTermYears(0.5)).not.toThrow();
    });

    it("accepts large number", () => {
      expect(() => validateTermYears(100)).not.toThrow();
    });

    it("accepts zero", () => {
      expect(() => validateTermYears(0)).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws INVALID_TERM_YEARS.code for string", () => {
      expect(() => validateTermYears("5")).toThrow(AppError);
      try {
        validateTermYears("5");
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_TERM_YEARS.code);
      }
    });

    it("throws INVALID_TERM_YEARS.code for null", () => {
      expect(() => validateTermYears(null)).toThrow(AppError);
      try {
        validateTermYears(null);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_TERM_YEARS.code);
      }
    });

    it("throws INVALID_TERM_YEARS.code for undefined", () => {
      expect(() => validateTermYears(undefined)).toThrow(AppError);
      try {
        validateTermYears(undefined);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_TERM_YEARS.code);
      }
    });

    it("throws INVALID_TERM_YEARS.code for NaN", () => {
      expect(() => validateTermYears(NaN)).toThrow(AppError);
      try {
        validateTermYears(NaN);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_TERM_YEARS.code);
      }
    });

    it("throws INVALID_TERM_YEARS.code for object", () => {
      expect(() => validateTermYears({})).toThrow(AppError);
      try {
        validateTermYears({});
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_TERM_YEARS.code);
      }
    });

    it("throws INVALID_TERM_YEARS.code for array", () => {
      expect(() => validateTermYears([5])).toThrow(AppError);
      try {
        validateTermYears([5]);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_TERM_YEARS.code);
      }
    });
  });
});