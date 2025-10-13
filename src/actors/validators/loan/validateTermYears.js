import { AppError } from "../../../errors/AppError";
import { LoanErrors } from "../../../errors/loanErrors";

export function validateTermYears(termYears) {
  if (typeof termYears !== "number" || isNaN(termYears))
    throw new AppError(LoanErrors.VALIDATION.INVALID_TERM_YEARS);
}