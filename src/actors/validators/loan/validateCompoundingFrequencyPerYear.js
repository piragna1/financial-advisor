import { AppError } from "../../../errors/AppError";
import { LoanErrors } from "../../../errors/loanErrors";

export function validateCompoundingFrequencyPerYear(compoundingFrequencyPerYear) {
  if (typeof compoundingFrequencyPerYear !== "number" || isNaN(compoundingFrequencyPerYear))
    throw new AppError(LoanErrors.COMPOUNDING_FREQUENCY_PER_YEAR.NOT_A_NUMBER);

    if (compoundingFrequencyPerYear < 0)
      throw new AppError(LoanErrors.COMPOUNDING_FREQUENCY_PER_YEAR.NEGATIVE);

}