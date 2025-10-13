import { validatePaymentFrequencyPerYear } from "../../../../../actors/validators/loan/validatePaymentFrequencyPerYear.js";
import { AppError } from "../../../../../errors/AppError.js";
import { LoanErrors } from "../../../../../errors/LoanErrors.js";

describe("validatePaymentFrequencyPerYear(paymentFrequencyPerYear)", () => {
  describe("valid inputs", () => {
    it("accepts 1", () => {
      expect(() => validatePaymentFrequencyPerYear(1)).not.toThrow();
    });

    it("accepts 12", () => {
      expect(() => validatePaymentFrequencyPerYear(12)).not.toThrow();
    });

    it("accepts 365", () => {
      expect(() => validatePaymentFrequencyPerYear(365)).not.toThrow();
    });

    it("accepts positive float", () => {
      expect(() => validatePaymentFrequencyPerYear(0.5)).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws INVALID_PAYMENT_FREQUENCY for string", () => {
      expect(() => validatePaymentFrequencyPerYear("12")).toThrow(AppError);
      try {
        validatePaymentFrequencyPerYear("12");
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY.code);
      }
    });

    it("throws INVALID_PAYMENT_FREQUENCY.code for null", () => {
      expect(() => validatePaymentFrequencyPerYear(null)).toThrow(AppError);
      try {
        validatePaymentFrequencyPerYear(null);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY.code);
      }
    });

    it("throws INVALID_PAYMENT_FREQUENCY.code for undefined", () => {
      expect(() => validatePaymentFrequencyPerYear(undefined)).toThrow(AppError);
      try {
        validatePaymentFrequencyPerYear(undefined);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY.code);
      }
    });

    it("throws INVALID_PAYMENT_FREQUENCY.code for NaN", () => {
      expect(() => validatePaymentFrequencyPerYear(NaN)).toThrow(AppError);
      try {
        validatePaymentFrequencyPerYear(NaN);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY.code);
      }
    });

    it("throws INVALID_PAYMENT_FREQUENCY.code for object", () => {
      expect(() => validatePaymentFrequencyPerYear({})).toThrow(AppError);
      try {
        validatePaymentFrequencyPerYear({});
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY.code);
      }
    });

    it("throws INVALID_PAYMENT_FREQUENCY.code for array", () => {
      expect(() => validatePaymentFrequencyPerYear([12])).toThrow(AppError);
      try {
        validatePaymentFrequencyPerYear([12]);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY.code);
      }
    });

    it("throws INVALID_PAYMENT_FREQUENCY.code for 0", () => {
      expect(() => validatePaymentFrequencyPerYear(0)).toThrow(AppError);
      try {
        validatePaymentFrequencyPerYear(0);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY.code);
      }
    });

    it("throws INVALID_PAYMENT_FREQUENCY.code for negative number", () => {
      expect(() => validatePaymentFrequencyPerYear(-1)).toThrow(AppError);
      try {
        validatePaymentFrequencyPerYear(-1);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY.code);
      }
    });
  });
});