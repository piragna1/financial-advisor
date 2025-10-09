import { AppError } from "../../../errors/appError.js";
import { PaymentErrors } from "../../../errors/paymentErrors.js";
export function validateAmount(amount) {
  // Validate amount is a non-negative number

  if (typeof amount !== 'number' || isNaN(amount))
    throw new AppError(PaymentErrors.AMOUNT.NOT_A_NUMBER);

  if (amount < 0) {
    throw new AppError(PaymentErrors.AMOUNT.LESS_THAN_ZERO);
  }
}
