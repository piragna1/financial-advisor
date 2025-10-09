// import { PaymentErrors } from "../../../errors/paymentErrors";
// import { AppError } from "../../../errors/appError";
// export function validateCurrency(currency) {
//   // Validate currency format and allowed values
//   if (typeof currency !== "string" || currency.trim() === "") {
//     throw new AppError(PaymentErrors.CURRENCY.INVALID);
//   }
//   const validCurrencies = ["USD", "ARS", "EUR"];
//   if (!validCurrencies.includes(currency)) {
//     throw new AppError(PaymentErrors.CURRENCY.INVALID);
//   }
// }
import { validateCurrency } from "../../../../../actors/validators/payment/validateCurrency.js";
import { AppError } from "../../../../../errors/appError.js";
import { PaymentErrors } from "../../../../../errors/paymentErrors.js";

describe("validateCurrency(currency)", () => {
  it("passes for valid currency 'USD'", () => {
    const currency = "USD";
    expect(() => validateCurrency(currency)).not.toThrow();
  });

  it("passes for valid currency 'ARS'", () => {
    const currency = "ARS";
    expect(() => validateCurrency(currency)).not.toThrow();
  });

  it("passes for valid currency 'EUR'", () => {
    const currency = "EUR";
    expect(() => validateCurrency(currency)).not.toThrow();
  });

  it("throws CURRENCY.INVALID for empty string", () => {
    const currency = "";
    expect(() => validateCurrency(currency)).toThrow(AppError);
    try {
      validateCurrency(currency);
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.CURRENCY.INVALID.code);
    }
  });

  it("throws CURRENCY.INVALID for unsupported currency", () => {
    const currency = "BTC";
    expect(() => validateCurrency(currency)).toThrow(AppError);
    try {
      validateCurrency(currency);
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.CURRENCY.INVALID.code);
    }
  });

  it("throws CURRENCY.INVALID for non-string input", () => {
    const currency = 123;
    expect(() => validateCurrency(currency)).toThrow(AppError);
    try {
      validateCurrency(currency);
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.CURRENCY.INVALID.code);
    }
  });

  it("throws CURRENCY.INVALID for null", () => {
    const currency = null;
    expect(() => validateCurrency(currency)).toThrow(AppError);
    try {
      validateCurrency(currency);
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.CURRENCY.INVALID.code);
    }
  });

  it("throws CURRENCY.INVALID for undefined", () => {
    const currency = undefined;
    expect(() => validateCurrency(currency)).toThrow(AppError);
    try {
      validateCurrency(currency);
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.CURRENCY.INVALID.code);
    }
  });
});