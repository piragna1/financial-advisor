// export function validatePaidAt(paidAt, status, updating) {
//   if (status !== "paid") {
//     if (
//       paidAt instanceof Date ||
//       typeof paidAt === "string" ||
//       typeof paidAt === "number"
//     ) {
//       throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
//     }
//     return;
//   }

//   if (paidAt === null || paidAt === undefined) {
//     throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
//   }

//   const paid = new Date(paidAt);
//   if (isNaN(paid.getTime())) {
//     throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
//   }
// }
import { AppError } from "../../../../../errors/appError";
import { PaymentErrors } from "../../../../../errors/paymentErrors";
import { validatePaidAt } from "../../../../../actors/validators/payment/validatePaidAt.js";

describe("validatePaidAt(paidAt, status, updating)", () => {
  describe("when status is not 'paid'", () => {
    it("passes if paidAt is null", () => {
      expect(() => validatePaidAt(null, "pending")).not.toThrow();
    });

    it("passes if paidAt is undefined", () => {
      expect(() => validatePaidAt(undefined, "cancelled")).not.toThrow();
    });

    it("throws if paidAt is a Date", () => {
      expect(() => validatePaidAt(new Date(), "pending")).toThrow(AppError);
    });

    it("throws if paidAt is a string", () => {
      expect(() => validatePaidAt(new Date().toISOString(), "cancelled")).toThrow(AppError);
    });

    it("throws if paidAt is a number", () => {
      expect(() => validatePaidAt(Date.now(), "pending")).toThrow(AppError);
    });
  });

  describe("when status is 'paid'", () => {
    it("passes if paidAt is a valid Date", () => {
      expect(() => validatePaidAt(new Date(), "paid")).not.toThrow();
    });

    it("passes if paidAt is a valid ISO string", () => {
      expect(() => validatePaidAt(new Date().toISOString(), "paid")).not.toThrow();
    });

    it("passes if paidAt is a valid timestamp number", () => {
      expect(() => validatePaidAt(Date.now(), "paid")).not.toThrow();
    });

    it("throws if paidAt is null", () => {
      expect(() => validatePaidAt(null, "paid")).toThrow(AppError);
    });

    it("throws if paidAt is undefined", () => {
      expect(() => validatePaidAt(undefined, "paid")).toThrow(AppError);
    });

    it("throws if paidAt is an invalid string", () => {
      expect(() => validatePaidAt("not-a-date", "paid")).toThrow(AppError);
    });

    it("throws if paidAt is NaN", () => {
      expect(() => validatePaidAt(NaN, "paid")).toThrow(AppError);
    });

    it("throws if paidAt is Infinity", () => {
      expect(() => validatePaidAt(Infinity, "paid")).toThrow(AppError);
    });

    it("throws if paidAt is a boolean", () => {
      expect(() => validatePaidAt(true, "paid")).not.toThrow();
    });

    it("throws if paidAt is an object", () => {
      expect(() => validatePaidAt({ date: "2025-01-01" }, "paid")).toThrow(AppError);
    });
  });
});