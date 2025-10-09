// import { AppError } from "../../../errors/appError.js";
// import {PaymentErrors} from '../../../errors/paymentErrors.js'
// export function validateAmount(amount){
//     // Validate amount is a non-negative number
//       if (typeof amount !== "number" || amount < 0) {
//         throw new AppError(PaymentErrors.AMOUNT.LESS_OR_EQUAL_THAN_ZERO);
//       }
// }


import { validateAmount } from "../../../../../actors/validators/payment/validateAmount.js";
import { AppError } from "../../../../../errors/appError.js";
import { PaymentErrors } from "../../../../../errors/paymentErrors.js";

describe("validateAmount(amount)", () => {
  it("passes for zero", () => {
    const amount = 0;
    expect(() => validateAmount(amount)).not.toThrow();
  });

  it("passes for positive number", () => {
    const amount = 1500;
    expect(() => validateAmount(amount)).not.toThrow();
  });

  it("throws for negative number", () => {
    const amount = -10;
    expect(() => validateAmount(amount)).toThrow(AppError);
  });

  it("throws for non-number string", () => {
    const amount = "100";
    expect(() => validateAmount(amount)).toThrow(PaymentErrors.AMOUNT.NOT_A_NUMBER);
  });

  it("throws for NaN", () => {
    const amount = NaN;
    expect(() => validateAmount(amount)).toThrow(AppError);
  });

  it("throws for null", () => {
    const amount = null;
    expect(() => validateAmount(amount)).toThrow(AppError);
    try {
      validateAmount(amount);
    } catch (err) {
      expect(err.code).toBe(PaymentErrors.AMOUNT.NOT_A_NUMBER.code);
    }
  });

  it("throws for undefined", () => {
    const amount = undefined;
    expect(() => validateAmount(amount)).toThrow(AppError);
  });
});