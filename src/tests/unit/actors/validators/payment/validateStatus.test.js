// import { PaymentErrors } from "../../../errors/paymentErrors";
// import { AppError } from "../../../errors/appError";

// export function validateStatus(status, updating){
    
//       // Validate allowed status values
//       const validStatuses = ["pending", "paid", "failed"];
//       if (!validStatuses.includes(status)) {
//         if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
//         console.log("throwing 1");
//         throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
//       }
// }

import { validateStatus } from "../../../../../actors/validators/payment/validateStatus.js";
import { AppError } from "../../../../../errors/appError";
import { PaymentErrors } from "../../../../../errors/paymentErrors";

describe("validateStatus(status, updating)", () => {
  describe("valid statuses", () => {
    it("passes for 'pending' during creation", () => {
      expect(() => validateStatus("pending", false)).not.toThrow();
    });

    it("passes for 'paid' during creation", () => {
      expect(() => validateStatus("paid", false)).not.toThrow();
    });

    it("passes for 'failed' during creation", () => {
      expect(() => validateStatus("failed", false)).not.toThrow();
    });

    it("passes for 'pending' during update", () => {
      expect(() => validateStatus("pending", true)).not.toThrow();
    });

    it("passes for 'paid' during update", () => {
      expect(() => validateStatus("paid", true)).not.toThrow();
    });

    it("passes for 'failed' during update", () => {
      expect(() => validateStatus("failed", true)).not.toThrow();
    });
  });

  describe("invalid statuses", () => {
    it("throws CREATE.INVALID_DATA for 'cancelled'", () => {
      expect(() => validateStatus("cancelled", false)).toThrow(AppError);
      try {
        validateStatus("cancelled", false);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.CREATE.INVALID_DATA);
      }
    });

    it("throws UPDATE.INVALID_DATA for 'refunded'", () => {
      expect(() => validateStatus("refunded", true)).toThrow(AppError);
      try {
        validateStatus("refunded", true);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.UPDATE.INVALID_DATA);
      }
    });

    it("throws CREATE.INVALID_DATA for null", () => {
      expect(() => validateStatus(null, false)).toThrow(AppError);
      try {
        validateStatus(null, false);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.CREATE.INVALID_DATA);
      }
    });

    it("throws UPDATE.INVALID_DATA for undefined", () => {
      expect(() => validateStatus(undefined, true)).toThrow(AppError);
      try {
        validateStatus(undefined, true);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.UPDATE.INVALID_DATA);
      }
    });

    it("throws CREATE.INVALID_DATA for number", () => {
      expect(() => validateStatus(123, false)).toThrow(AppError);
      try {
        validateStatus(123, false);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.CREATE.INVALID_DATA);
      }
    });

    it("throws UPDATE.INVALID_DATA for object", () => {
      expect(() => validateStatus({ status: "paid" }, true)).toThrow(AppError);
      try {
        validateStatus({ status: "paid" }, true);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.UPDATE.INVALID_DATA);
      }
    });
  });
});