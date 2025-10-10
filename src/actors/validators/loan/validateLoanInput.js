import { validateStartDate } from "./validateStartDate.js";
import { validateTermYears } from "./validateTermYears.js";
import { validatePrincipal } from './validatePrincipal.js'
import { validateInterestRate } from './validateInterestRate.js'
import { validatePaymentFrequencyPerYear } from "./validatePaymentFrequencyPerYear.js";
import { validateCompoundingFrequencyPerYear } from "./validateCompoundingFrequencyPerYear.js";
import { validateGracePeriodMonths } from "./validateGracePeriodMonths.js";
import { validateBalloonPayment } from "./validateBalloonPayment.js";
import { validateLoanType } from "./validateLoanType.js";
import { validateCurrency } from "./validateCurrency.js";

// validators/validateLoanData.js
export function validateLoanInput(loanData) {
  //not nullish and object
  if (!loanData || typeof loanData !== "object")
    throw new Error("Invalid loan data received");

  //id not nullish and string
  if (!loanData.id || typeof loanData.id !== "string")
    throw new Error("Loan ID must be a string");

  //fp id not nullish and string
  if (
    !loanData.financialProfileId ||
    typeof loanData.financialProfileId !== "string"
  )
    throw new Error("Financial profile ID must be a string");

  //startDate instance of date and .getTime() returns a number
  validateStartDate(loanData.startDate);

  //termyears is number
  validateTermYears(loanData.termYears);

  //principal is a number
  validatePrincipal(loanData.principal);

  //interest rate is a number
  validateInterestRate(loanData.interestRate);

  //payment frequency per year is a number greater than 0
  validatePaymentFrequencyPerYear(loanData.paymentFrequencyPerYear);

  // compounding frequency per year is a number greater than zero
  validateCompoundingFrequencyPerYear(loanData.compoundingFrequencyPerYear);

  //grace period months is a number greater than zero
  validateGracePeriodMonths(loanData.gracePeriodMonths);

  //balloon payment is a number greater than zero
  validateBalloonPayment(loanData.baloonPayment);

  //allowed types for loan types
  validateLoanType(loanData.loanType);

  //currency is a 3-letter ISO code.
  validateCurrency(loanData.currency);
}
