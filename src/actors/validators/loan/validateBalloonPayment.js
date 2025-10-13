import { AppError } from '../../../errors/AppError.js'
import { loanErrors } from '../../../errors/LoanErrors.js';

export function validateBalloonPayment(balloonPayment) {
  if (typeof balloonPayment !== "number" || isNaN(balloonPayment))
    throw new AppError(loanErrors.VALIDATION.INVALID_BALLOON_PAYMENT)
  if (balloonPayment < 0)
    throw new AppError(loanErrors.VALIDATION.INVALID_BALLOON_PAYMENT)
}