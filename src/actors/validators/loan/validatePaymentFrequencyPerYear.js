import { AppError } from "../../../errors/AppError";
import { loanErrors } from "../../../errors/loanErrors";

export function validatePaymentFrequencyPerYear(paymentFrequencyPerYear) {
  if (typeof paymentFrequencyPerYear !== "number" || isNaN(paymentFrequencyPerYear))
    throw new AppError(loanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY)
  if (paymentFrequencyPerYear <= 0)
    throw new AppError(loanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY)
}