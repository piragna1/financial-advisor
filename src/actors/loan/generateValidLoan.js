import { buildLoanEntity } from "../../entities/loanEntity";
import { AppError } from "../../errors/AppError";
import { LoanErrors } from "../../errors/loanErrors";

export function generateValidLoan(financialProfileId, overrides = {}) {
  if (!financialProfileId || typeof financialProfileId !== "string") {
    throw new AppError(LoanErrors.CREATION.MISSING_FINANCIAL_PROFILE_ID);
  }

  return buildLoanEntity({
    financialProfileId,
    principal: 10000,
    interestRate: 5.5,
    startDate: new Date(),
    termYears: 5,
    paymentFrequencyPerYear: 12,
    compoundingFrequencyPerYear: 12,
    gracePeriodMonths: 0,
    balloonPayment: 0,
    loanType: "personal",
    currency: "USD",
    ...overrides
  });
}
