import {AppError} from '../../../errors/AppError.js'
import {loanErrors} from '../../../errors/LoanErrors.js'
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
    throw new AppError(loanErrors.VALIDATION.INVALID_LOAN_TYPE);
}