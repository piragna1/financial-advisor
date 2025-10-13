import { validateStartDate } from "../../../../../actors/validators/loan/validateStartDate.js";
import { AppError } from "../../../../../errors/AppError.js";
import { loanErrors } from "../../../../../errors/LoanErrors.js";

describe("validateStartDate(startDate)", () => {
  describe("valid inputs", () => {
    it("accepts current date", () => {
      expect(() => validateStartDate(new Date())).not.toThrow();
    });

    it("accepts specific valid date", () => {
      expect(() => validateStartDate(new Date("2025-01-01"))).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws INVALID_START_DATE for invalid date string", () => {
      expect(() => validateStartDate(new Date("invalid"))).toThrow(AppError);
      try {
        validateStartDate(new Date("invalid"));
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_START_DATE.code);
      }
    });

    it("throws INVALID_START_DATE.code for string", () => {
      expect(() => validateStartDate("2025-01-01")).toThrow(AppError);
      try {
        validateStartDate("2025-01-01");
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_START_DATE.code);
      }
    });

    it("throws INVALID_START_DATE.code for null", () => {
      expect(() => validateStartDate(null)).toThrow(AppError);
      try {
        validateStartDate(null);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_START_DATE.code);
      }
    });

    it("throws INVALID_START_DATE.code for undefined", () => {
      expect(() => validateStartDate(undefined)).toThrow(AppError);
      try {
        validateStartDate(undefined);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_START_DATE.code);
      }
    });

    it("throws INVALID_START_DATE.code for number", () => {
      expect(() => validateStartDate(123456789)).toThrow(AppError);
      try {
        validateStartDate(123456789);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_START_DATE.code);
      }
    });

    it("throws INVALID_START_DATE.code for object", () => {
      expect(() => validateStartDate({})).toThrow(AppError);
      try {
        validateStartDate({});
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_START_DATE.code);
      }
    });

    it("throws INVALID_START_DATE.code for array", () => {
      expect(() => validateStartDate([new Date()])).toThrow(AppError);
      try {
        validateStartDate([new Date()]);
      } catch (err) {
        expect(err.code).toBe(loanErrors.VALIDATION.INVALID_START_DATE.code);
      }
    });
  });
});