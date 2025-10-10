// import { PaymentErrors } from "../../../errors/paymentErrors";
// import { AppError } from "../../../errors/appError";

// export function validateStatus(status){
    
//       // Validate allowed status values
//       const validStatuses = ["pending", "paid", "failed"];
//       if (!validStatuses.includes(status)) {
//         throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
//       }
// }

import { validateStatus } from "../../../../../actors/validators/payment/validateStatus.js";
import { AppError } from "../../../../../errors/appError";
import { PaymentErrors } from "../../../../../errors/paymentErrors";

describe("validateStatus(status)", () => {
  describe("valid statuses", () => {
    it("passes for 'pending'", () => {
      expect(() => validateStatus("pending")).not.toThrow();
    });

    it("passes for 'paid'", () => {
      expect(() => validateStatus("paid")).not.toThrow();
    });

    it("passes for 'failed'", () => {
      expect(() => validateStatus("failed")).not.toThrow();
    });
  });

  describe("invalid statuses", () => {
    it("throws STATUS.INVALID for 'cancelled'", () => {
      expect(() => validateStatus("cancelled")).toThrow(AppError);
      try {
        validateStatus("cancelled");
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.STATUS.INVALID.code);
      }
    });

    it("throws STATUS.INVALID for null", () => {
      expect(() => validateStatus(null)).toThrow(AppError);
      try {
        validateStatus(null);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.STATUS.INVALID.code);
      }
    });

    it("throws STATUS.INVALID for undefined", () => {
      expect(() => validateStatus(undefined)).toThrow(AppError);
      try {
        validateStatus(undefined);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.STATUS.INVALID.code);
      }
    });

    it("throws STATUS.INVALID for number", () => {
      expect(() => validateStatus(123)).toThrow(AppError);
      try {
        validateStatus(123);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.STATUS.INVALID.code);
      }
    });

    it("throws STATUS.INVALID for object", () => {
      expect(() => validateStatus({ status: "paid" })).toThrow(AppError);
      try {
        validateStatus({ status: "paid" });
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.STATUS.INVALID.code);
      }
    });

    it("throws STATUS.INVALID for empty string", () => {
      expect(() => validateStatus("")).toThrow(AppError);
      try {
        validateStatus("");
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.STATUS.INVALID.code);
      }
    });
  });
});