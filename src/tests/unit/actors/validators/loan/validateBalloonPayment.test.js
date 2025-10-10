// import { AppError } from '../../../errors/AppError.js'
// import { LoanErrors } from '../../../errors/loanErrors';

// export function validateBalloonPayment(balloonPayment) {
//   if (typeof balloonPayment !== "number" || isNaN(balloonPayment))
//     throw new AppError(LoanErrors.BALLOON_PAYMENT.NOT_A_NUMBER)
//   if (balloonPayment < 0)
//     throw new AppError(LoanErrors.BALLOON_PAYMENT.NEGATIVE)
// }


import { validateBalloonPayment } from "../../../../../actors/validators/loan/validateBalloonPayment.js";
import { AppError } from "../../../../../errors/AppError.js";
import { LoanErrors } from "../../../../../errors/loanErrors.js";

describe("validateBalloonPayment(balloonPayment)", () => {
  describe("valid inputs", () => {
    it("accepts 0", () => {
      expect(() => validateBalloonPayment(0)).not.toThrow();
    });

    it("accepts positive integer", () => {
      expect(() => validateBalloonPayment(1000)).not.toThrow();
    });

    it("accepts positive float", () => {
      expect(() => validateBalloonPayment(0.01)).not.toThrow();
    });
  });

  describe("invalid inputs", () => {
    it("throws NOT_A_NUMBER for string", () => {
      expect(() => validateBalloonPayment("1000")).toThrow(AppError);
      try {
        validateBalloonPayment("1000");
      } catch (err) {
        expect(err.code).toBe(LoanErrors.BALLOON_PAYMENT.NOT_A_NUMBER.code);
      }
    });

    it("throws NOT_A_NUMBER for null", () => {
      expect(() => validateBalloonPayment(null)).toThrow(AppError);
      try {
        validateBalloonPayment(null);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.BALLOON_PAYMENT.NOT_A_NUMBER.code);
      }
    });

    it("throws NOT_A_NUMBER for undefined", () => {
      expect(() => validateBalloonPayment(undefined)).toThrow(AppError);
      try {
        validateBalloonPayment(undefined);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.BALLOON_PAYMENT.NOT_A_NUMBER.code);
      }
    });

    it("throws NOT_A_NUMBER for NaN", () => {
      expect(() => validateBalloonPayment(NaN)).toThrow(AppError);
      try {
        validateBalloonPayment(NaN);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.BALLOON_PAYMENT.NOT_A_NUMBER.code);
      }
    });

    it("throws NOT_A_NUMBER for object", () => {
      expect(() => validateBalloonPayment({})).toThrow(AppError);
      try {
        validateBalloonPayment({});
      } catch (err) {
        expect(err.code).toBe(LoanErrors.BALLOON_PAYMENT.NOT_A_NUMBER.code);
      }
    });

    it("throws NOT_A_NUMBER for array", () => {
      expect(() => validateBalloonPayment([1000])).toThrow(AppError);
      try {
        validateBalloonPayment([1000]);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.BALLOON_PAYMENT.NOT_A_NUMBER.code);
      }
    });

    it("throws NEGATIVE for negative number", () => {
      expect(() => validateBalloonPayment(-1)).toThrow(AppError);
      try {
        validateBalloonPayment(-1);
      } catch (err) {
        expect(err.code).toBe(LoanErrors.BALLOON_PAYMENT.NEGATIVE.code);
      }
    });
  });
});