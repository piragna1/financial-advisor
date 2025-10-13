import { AppError } from "../../../errors/AppError";
import { loanErrors } from "../../../errors/loanErrors";

export function validateTermYears(termYears) {
  if (typeof termYears !== "number" || isNaN(termYears))
    throw new AppError(loanErrors.VALIDATION.INVALID_TERM_YEARS);
}