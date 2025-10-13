import {AppError } from '../../../errors/AppError.js'
import { loanErrors } from '../../../errors/loanErrors.js';
export function validateInterestRate(interestRate){
 
  if (typeof interestRate !== "number"  || isNaN(interestRate)) 
    throw new AppError(loanErrors.VALIDATION.INVALID_INTEREST_RATE);
  if (interestRate <= 0)
    throw new AppError(loanErrors.VALIDATION.INVALID_INTEREST_RATE)
}