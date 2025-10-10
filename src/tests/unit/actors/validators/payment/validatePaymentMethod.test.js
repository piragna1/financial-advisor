import { validatePaymentMethod } from "../../../../../actors/validators/payment/validatePaymentMethod.js";
import { PaymentErrors } from "../../../../../errors/paymentErrors.js";
import { AppError } from "../../../../../errors/AppError.js";


describe("validatePaymentMethod(method, updating)", () => {
  describe("valid methods", () => {
    it("passes for 'bank-transfer' during creation", () => {
      expect(() => validatePaymentMethod("bank-transfer", false)).not.toThrow();
    });

    it("passes for 'cash' during creation", () => {
      expect(() => validatePaymentMethod("cash", false)).not.toThrow();
    });

    it("passes for 'credit-card' during creation", () => {
      expect(() => validatePaymentMethod("credit-card", false)).not.toThrow();
    });

    it("passes for 'bank-transfer' during update", () => {
      expect(() => validatePaymentMethod("bank-transfer", true)).not.toThrow();
    });

    it("passes for 'cash' during update", () => {
      expect(() => validatePaymentMethod("cash", true)).not.toThrow();
    });

    it("passes for 'credit-card' during update", () => {
      expect(() => validatePaymentMethod("credit-card", true)).not.toThrow();
    });
  });

  describe("invalid methods", () => {
    it("throws CREATE.INVALID_DATA for 'paypal'", () => {
      expect(() => validatePaymentMethod("paypal", false)).toThrow(AppError);
      try {
        validatePaymentMethod("paypal", false);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.CREATE.INVALID_DATA.code);
      }
    });

    it("throws UPDATE.INVALID_DATA for 'bitcoin'", () => {
      expect(() => validatePaymentMethod("bitcoin", true)).toThrow(AppError);
      try {
        validatePaymentMethod("bitcoin", true);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.UPDATE.INVALID_DATA.code);
      }
    });

    it("throws CREATE.INVALID_DATA for null", () => {
      expect(() => validatePaymentMethod(null, false)).toThrow(AppError);
      try {
        validatePaymentMethod(null, false);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.CREATE.INVALID_DATA.code);
      }
    });

    it("throws UPDATE.INVALID_DATA for undefined", () => {
      expect(() => validatePaymentMethod(undefined, true)).toThrow(AppError);
      try {
        validatePaymentMethod(undefined, true);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.UPDATE.INVALID_DATA.code);
      }
    });

    it("throws CREATE.INVALID_DATA for number", () => {
      expect(() => validatePaymentMethod(123, false)).toThrow(AppError);
      try {
        validatePaymentMethod(123, false);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.CREATE.INVALID_DATA.code);
      }
    });

    it("throws UPDATE.INVALID_DATA for object", () => {
      expect(() => validatePaymentMethod({ method: "cash" }, true)).toThrow(AppError);
      try {
        validatePaymentMethod({ method: "cash" }, true);
      } catch (err) {
        expect(err.code).toBe(PaymentErrors.UPDATE.INVALID_DATA.code);
      }
    });
  });
});