// import { PaymentErrors } from "../../../errors/paymentErrors";
// import { AppError } from "../../../errors/appError";


// // src/validators/paymentValidator.js
// export function validateDueDate(dueDate, updating = false) {
//   const minDueDate = new Date();
//   minDueDate.setDate(minDueDate.getDate() + 20);

//   const parsed = new Date(dueDate);
//   if (parsed < minDueDate) {
//     throw new AppError(PaymentErrors.DUE_DATE.INVALID);
//   }
// }

import { validateDueDate } from "../../../../../actors/validators/payment/validateDueDate.js";
import { AppError } from "../../../../../errors/appError.js";
import { PaymentErrors } from "../../../../../errors/paymentErrors.js";

describe("validateDueDate(dueDate)", () => {
  it("passes for a date 21 days in the future", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 21);
    expect(() => validateDueDate(futureDate.toISOString())).not.toThrow();
  });

  it("passes for a date exactly 20 days in the future", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 20);
    expect(() => validateDueDate(futureDate.toISOString())).not.toThrow();
  });

  it("throws for a date 19 days in the future", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 19);
    expect(() => validateDueDate(futureDate.toISOString())).toThrow(AppError);
    try {
      validateDueDate(futureDate.toISOString());
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.DUE_DATE.INVALID.code);
    }
  });

  it("throws for a past date", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(() => validateDueDate(pastDate.toISOString())).toThrow(AppError);
    try {
      validateDueDate(pastDate.toISOString());
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.DUE_DATE.INVALID.code);
    }
  });

  it("throws for today", () => {
    const today = new Date();
    expect(() => validateDueDate(today.toISOString())).toThrow(AppError);
    try {
      validateDueDate(today.toISOString());
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.DUE_DATE.INVALID.code);
    }
  });

  it("throws for invalid date string", () => {

    const invalidDate = "not-a-date";
    expect(() => validateDueDate(invalidDate)).toThrow(AppError);
  });

  it("throws for null", () => {
    const dueDate = null;
    expect(() => validateDueDate(dueDate)).toThrow(AppError);
    try {
      validateDueDate(dueDate);
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.DUE_DATE.INVALID.code);
    }
  });

  it("throws for undefined", () => {
    const dueDate = undefined;
    expect(() => validateDueDate(dueDate)).toThrow(AppError);
  });
});