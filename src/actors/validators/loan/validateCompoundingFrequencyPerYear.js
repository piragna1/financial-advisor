import { AppError } from "../../../errors/AppError";
import { loanErrors, LoanErrors } from "../../../errors/LoanErrors.js";

export function validateCompoundingFrequencyPerYear(compoundingFrequencyPerYear) {
  if (typeof compoundingFrequencyPerYear !== "number" || isNaN(compoundingFrequencyPerYear))
    throw new AppError(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY);

    if (compoundingFrequencyPerYear < 0)
      throw new AppError(loanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY);

}