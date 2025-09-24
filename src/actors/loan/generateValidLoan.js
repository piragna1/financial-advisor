import { buildLoanEntity } from "../../entities/loanEntity.js";

export function generateValidLoan(financialProfileId, overrides = {}) {
  if (!financialProfileId || typeof financialProfileId !== "string") {
    throw new Error("generateValidLoan: financialProfileId must be a string");
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
