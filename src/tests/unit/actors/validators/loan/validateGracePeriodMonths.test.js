
import { validateGracePeriodMonths } from "../../../../../actors/validators/loan/validateGracePeriodMonths.js";
import { AppError } from "../../../../../errors/AppError.js";
import { LoanErrors } from "../../../../../errors/loanErrors.js";

describe("validateGracePeriodMonths(gracePeriodMonths)", () => {
  describe("valid inputs", () => {
    it("accepts 0", () => {
      expect(() => validateGracePeriodMonths(0)).not.toThrow();
    });

    it("accepts positive integer", () => {
      expect(() => validateGracePeriodMonths(6)).not.toThrow();
    });

    it("accepts positive float", () => {
      expect(() => validateGracePeriodMonths(0.5)).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws NOT_A_NUMBER for string", () => {
      expect(() => validateGracePeriodMonths("6")).toThrow(AppError);
      try {
        validateGracePeriodMonths("6");
      } catch (err) {
        expect(err.code).toBe(LoanErrors.GRACE_PERIOD_MONTHS.NOT_A_NUMBER);
      }
    });

    it("throws NOT_A_NUMBER for null", () => {
      expect(() => validateGracePeriodMonths(null)).toThrow(AppError);
      try {
        validateGracePeriodMonths(null);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.GRACE_PERIOD_MONTHS.NOT_A_NUMBER);
      }
    });

    it("throws NOT_A_NUMBER for undefined", () => {
      expect(() => validateGracePeriodMonths(undefined)).toThrow(AppError);
      try {
        validateGracePeriodMonths(undefined);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.GRACE_PERIOD_MONTHS.NOT_A_NUMBER);
      }
    });

    it("throws NOT_A_NUMBER for NaN", () => {
      expect(() => validateGracePeriodMonths(NaN)).toThrow(AppError);
      try {
        validateGracePeriodMonths(NaN);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.GRACE_PERIOD_MONTHS.NOT_A_NUMBER);
      }
    });

    it("throws NOT_A_NUMBER for object", () => {
      expect(() => validateGracePeriodMonths({})).toThrow(AppError);
      try {
        validateGracePeriodMonths({});
      } catch (err) {
        expect(err.code).toBe(LoanErrors.GRACE_PERIOD_MONTHS.NOT_A_NUMBER);
      }
    });

    it("throws NOT_A_NUMBER for array", () => {
      expect(() => validateGracePeriodMonths([6])).toThrow(AppError);
      try {
        validateGracePeriodMonths([6]);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.GRACE_PERIOD_MONTHS.NOT_A_NUMBER);
      }
    });

    it("throws NEGATIVE for negative number", () => {
      expect(() => validateGracePeriodMonths(-1)).toThrow(AppError);
      try {
        validateGracePeriodMonths(-1);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.GRACE_PERIOD_MONTHS.NEGATIVE);
      }
    });
  });
});