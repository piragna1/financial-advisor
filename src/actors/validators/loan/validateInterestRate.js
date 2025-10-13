import {AppError } from '../../../errors/AppError.js'
import { LoanErrors } from '../../../errors/loanErrors.js';
export function validateInterestRate(interestRate){
 
  if (typeof interestRate !== "number"  || isNaN(interestRate)) 
    throw new AppError(LoanErrors.VALIDATION.INVALID_INTEREST_RATE);
  if (interestRate <= 0)
    throw new AppError(LoanErrors.VALIDATION.INVALID_INTEREST_RATE)
}