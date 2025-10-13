import { AppError } from "../../../errors/AppError";
import { LoanErrors } from "../../../errors/loanErrors";

export function validatePaymentFrequencyPerYear(paymentFrequencyPerYear) {
  if (typeof paymentFrequencyPerYear !== "number" || isNaN(paymentFrequencyPerYear))
    throw new AppError(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY)
  if (paymentFrequencyPerYear <= 0)
    throw new AppError(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY)
}