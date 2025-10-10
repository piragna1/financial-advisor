import { AppError } from '../../../errors/AppError.js'
import { LoanErrors } from '../../../errors/loanErrors';

export function validateBalloonPayment(balloonPayment) {
  if (typeof balloonPayment !== "number" || isNaN(balloonPayment))
    throw new AppError(LoanErrors.BALLOON_PAYMENT.NOT_A_NUMBER)
  if (balloonPayment < 0)
    throw new AppError(LoanErrors.BALLOON_PAYMENT.NEGATIVE)
}