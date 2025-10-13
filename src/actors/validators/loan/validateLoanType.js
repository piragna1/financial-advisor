import {AppError} from '../../../errors/AppError.js'
import {LoanErrors, loanErrors} from '../../../errors/loanErrors.js'
export function validateLoanType(loanType){
    const allowedLoanTypes = [
    "personal",
    "mortgage",
    "auto",
    "education",
    "business",
  ];
  //loanType is an allowed type and a string
  if (
    typeof loanType !== "string" ||
    !allowedLoanTypes.includes(loanType.toLowerCase())
  )
    throw new AppError(LoanErrors.VALIDATION.INVALID_LOAN_TYPE);
}