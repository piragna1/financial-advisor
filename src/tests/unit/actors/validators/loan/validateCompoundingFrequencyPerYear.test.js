import { validateCompoundingFrequencyPerYear } from "../../../../../actors/validators/loan/validateCompoundingFrequencyPerYear.js";
import { AppError } from "../../../../../errors/AppError.js";
import { loanErrors } from "../../../../../errors/loanErrors.js";

describe("validateCompoundingFrequencyPerYear(compoundingFrequencyPerYear)", () => {
  describe("valid inputs", () => {
    it("accepts 0", () => {
      expect(() => validateCompoundingFrequencyPerYear(0)).not.toThrow();
    });

    it("accepts positive integer", () => {
      expect(() => validateCompoundingFrequencyPerYear(12)).not.toThrow();
    });

    it("accepts high frequency", () => {
      expect(() => validateCompoundingFrequencyPerYear(365)).not.toThrow();
    });

    it("accepts positive float", () => {
      expect(() => validateCompoundingFrequencyPerYear(0.5)).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws NOT_A_NUMBER for string", () => {
      expect(() => validateCompoundingFrequencyPerYear("12")).toThrow(AppError);
      try {
        validateCompoundingFrequencyPerYear("12");
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY.code);
      }
    });

    it("throws NOT_A_NUMBER for null", () => {
      expect(() => validateCompoundingFrequencyPerYear(null)).toThrow(AppError);
      try {
        validateCompoundingFrequencyPerYear(null);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY.code);
      }
    });

    it("throws NOT_A_NUMBER for undefined", () => {
      expect(() => validateCompoundingFrequencyPerYear(undefined)).toThrow(AppError);
      try {
        validateCompoundingFrequencyPerYear(undefined);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY.code);
      }
    });

    it("throws NOT_A_NUMBER for NaN", () => {
      expect(() => validateCompoundingFrequencyPerYear(NaN)).toThrow(AppError);
      try {
        validateCompoundingFrequencyPerYear(NaN);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY.code);
      }
    });

    it("throws NOT_A_NUMBER for object", () => {
      expect(() => validateCompoundingFrequencyPerYear({})).toThrow(AppError);
      try {
        validateCompoundingFrequencyPerYear({});
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY.code);
      }
    });

    it("throws NOT_A_NUMBER for array", () => {
      expect(() => validateCompoundingFrequencyPerYear([12])).toThrow(AppError);
      try {
        validateCompoundingFrequencyPerYear([12]);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY.code);
      }
    });

    it("throws NEGATIVE for negative number", () => {

      expect(() => validateCompoundingFrequencyPerYear(-1)).toThrow(AppError);

      try {
        validateCompoundingFrequencyPerYear(-1);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY.code);
      }
    });
  });
});