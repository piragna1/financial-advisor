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
  if (
    !(loanData.startDate instanceof Date) ||
    isNaN(loanData.startDate.getTime())
  )
    throw new Error("startDate must be a valid Date object");

    //termyears is number
  if (typeof loanData.termYears !== "number" || isNaN(loanData.termYears))
    throw new Error("termYears must be a valid number");

  //principal is a number
  if (typeof loanData.principal !== "number" || isNaN(loanData.principal))
    throw new Error("Principal must be a valid number");

  //interest rate is a number
  if (typeof loanData.interestRate !== "number" || loanData.interestRate <= 0)
    throw new Error("Interest rate must be a positive number");

  //payment frequency per year is a number greater than 0
  if (
    typeof loanData.paymentFrequencyPerYear !== "number" ||
    loanData.paymentFrequencyPerYear <= 0
  )
    throw new Error("Payment frequency must be a positive number");

    // compounding frequency per year is a number greater than zero
  if (
    typeof loanData.compoundingFrequencyPerYear !== "number" ||
    loanData.compoundingFrequencyPerYear <= 0
  )
    throw new Error("Compounding frequency must be a positive number");


    //grace period months is a number greater than zero
  if (
    typeof loanData.gracePeriodMonths !== "number" ||
    loanData.gracePeriodMonths < 0
  )
    throw new Error("Grace period must be zero or positive");

    //balloon payment is a number greater than zero
  if (
    loanData.balloonPayment !== null &&
    (typeof loanData.balloonPayment !== "number" || loanData.balloonPayment < 0)
  )
    throw new Error("Balloon payment must be zero or positive");

    //allowed types for loan types
  const allowedLoanTypes = [
    "personal",
    "mortgage",
    "auto",
    "education",
    "business",
  ];

  //loanType is an allowed type and a string
  if (
    typeof loanData.loanType !== "string" ||
    !allowedLoanTypes.includes(loanData.loanType.toLowerCase())
  )
    throw new Error(`Unsupported loan type: ${loanData.loanType}`);

    //currency is a 3-letter ISO code.
  if (
    typeof loanData.currency !== "string" ||
    !/^[A-Z]{3}$/.test(loanData.currency)
  )
    throw new Error("Currency must be a 3-letter ISO code (e.g., USD, EUR)");
}
