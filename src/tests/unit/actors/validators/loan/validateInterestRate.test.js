// import {AppError } from '../../../errors/AppError.js'
// import { LoanErrors } from '../../../errors/loanErrors.js';
// export function validateInterestRate(interestRate){
 
//   if (typeof loanData.interestRate !== "number" ) 
//     throw new AppError(LoanErrors.VALIDATION.INVALID_INTEREST_RATE);
//   if (loanData.interestRate <= 0)
//     throw new Error("Interest rate must be a positive number");
// }

import { validateInterestRate } from "../../../../../actors/validators/loan/validateInterestRate.js";
import { AppError } from "../../../../../errors/AppError.js";
import { LoanErrors } from "../../../../../errors/LoanErrors.js";
describe("validateInterestRate(interestRate)", () => {
  describe("valid inputs", () => {
    it("accepts small positive float", () => {
      expect(() => validateInterestRate(0.01)).not.toThrow();
    });

    it("accepts positive integer", () => {
      expect(() => validateInterestRate(5)).not.toThrow();
    });

    it("accepts large positive number", () => {
      expect(() => validateInterestRate(100)).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws INVALID_INTEREST_RATE for string", () => {
      expect(() => validateInterestRate("5")).toThrow(AppError);
      try {
        validateInterestRate("5");
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_INTEREST_RATE.code);
      }
    });

    it("throws INVALID_INTEREST_RATE for null", () => {
      expect(() => validateInterestRate(null)).toThrow(AppError);
      try {
        validateInterestRate(null);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_INTEREST_RATE.code);
      }
    });

    it("throws INVALID_INTEREST_RATE for undefined", () => {
      expect(() => validateInterestRate(undefined)).toThrow(AppError);
      try {
        validateInterestRate(undefined);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_INTEREST_RATE.code);
      }
    });

    it("throws INVALID_INTEREST_RATE for NaN", () => {
      expect(() => validateInterestRate(NaN)).toThrow(AppError);
      try {
        validateInterestRate(NaN);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_INTEREST_RATE.code);
      }
    });

    it("throws INVALID_INTEREST_RATE for object", () => {
      expect(() => validateInterestRate({})).toThrow(AppError);
      try {
        validateInterestRate({});
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_INTEREST_RATE.code);
      }
    });

    it("throws INVALID_INTEREST_RATE for array", () => {
      expect(() => validateInterestRate([5])).toThrow(AppError);
      try {
        validateInterestRate([5]);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_INTEREST_RATE.code);
      }
    });

    it("throws NON_POSITIVE_INTEREST_RATE for 0", () => {
      expect(() => validateInterestRate(0)).toThrow(AppError);
      try {
        validateInterestRate(0);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_INTEREST_RATE.code);
      }
    });

    it("throws NON_POSITIVE_INTEREST_RATE for negative number", () => {
      expect(() => validateInterestRate(-1)).toThrow(AppError);
      try {
        validateInterestRate(-1);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.VALIDATION.INVALID_INTEREST_RATE.code);
      }
    });
  });
});