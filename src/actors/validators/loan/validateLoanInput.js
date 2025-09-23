// validators/validateLoanData.js
export function validateLoanInput(loanData) {
  if (!loanData || typeof loanData !== "object")
    throw new Error("Invalid loan data received");

  if (!loanData.id || typeof loanData.id !== "string")
    throw new Error("Loan ID must be a string");

  if (!loanData.financialProfileId || typeof loanData.financialProfileId !== "string")
    throw new Error("Financial profile ID must be a string");

  if (!(loanData.startDate instanceof Date) || isNaN(loanData.startDate.getTime()))
    throw new Error("startDate must be a valid Date object");

  if (typeof loanData.termYears !== "number" || isNaN(loanData.termYears))
    throw new Error("termYears must be a valid number");

  if (typeof loanData.principal !== "number" || isNaN(loanData.principal))
    throw new Error("Principal must be a valid number");

  if (typeof loanData.interestRate !== "number" || loanData.interestRate <= 0)
    throw new Error("Interest rate must be a positive number");

  if (typeof loanData.paymentFrequencyPerYear !== "number" || loanData.paymentFrequencyPerYear <= 0)
    throw new Error("Payment frequency must be a positive number");

  if (typeof loanData.compoundingFrequencyPerYear !== "number" || loanData.compoundingFrequencyPerYear <= 0)
    throw new Error("Compounding frequency must be a positive number");

  if (typeof loanData.gracePeriodMonths !== "number" || loanData.gracePeriodMonths < 0)
    throw new Error("Grace period must be zero or positive");

  if (typeof loanData.balloonPayment !== "number" || loanData.balloonPayment < 0)
    throw new Error("Balloon payment must be zero or positive");

  const allowedLoanTypes = ['personal', 'mortgage', 'auto', 'education', 'business'];
  if (typeof loanData.loanType !== 'string' || !allowedLoanTypes.includes(loanData.loanType.toLowerCase()))
    throw new Error(`Unsupported loan type: ${loanData.loanType}`);

  if (typeof loanData.currency !== "string" || !/^[A-Z]{3}$/.test(loanData.currency))
    throw new Error("Currency must be a 3-letter ISO code (e.g., USD, EUR)");
}
