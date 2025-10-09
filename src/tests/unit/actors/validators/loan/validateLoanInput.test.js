// // validators/validateLoanData.js
// export function validateLoanInput(loanData) {
//   //not nullish and object
//   if (!loanData || typeof loanData !== "object")
//     throw new Error("Invalid loan data received");

//   //id not nullish and string
//   if (!loanData.id || typeof loanData.id !== "string")
//     throw new Error("Loan ID must be a string");

//   //fp id not nullish and string
//   if (
//     !loanData.financialProfileId ||
//     typeof loanData.financialProfileId !== "string"
//   )
//     throw new Error("Financial profile ID must be a string");

//     //startDate instance of date and .getTime() returns a number
//   if (
//     !(loanData.startDate instanceof Date) ||
//     isNaN(loanData.startDate.getTime())
//   )
//     throw new Error("startDate must be a valid Date object");

//     //termyears is number
//   if (typeof loanData.termYears !== "number" || isNaN(loanData.termYears))
//     throw new Error("termYears must be a valid number");

//   //principal is a number
//   if (typeof loanData.principal !== "number" || isNaN(loanData.principal))
//     throw new Error("Principal must be a valid number");

//   //interest rate is a number
//   if (typeof loanData.interestRate !== "number" || loanData.interestRate <= 0)
//     throw new Error("Interest rate must be a positive number");

//   //payment frequency per year is a number greater than 0
//   if (
//     typeof loanData.paymentFrequencyPerYear !== "number" ||
//     loanData.paymentFrequencyPerYear <= 0
//   )
//     throw new Error("Payment frequency must be a positive number");

//     // compounding frequency per year is a number greater than zero
//   if (
//     typeof loanData.compoundingFrequencyPerYear !== "number" ||
//     loanData.compoundingFrequencyPerYear <= 0
//   )
//     throw new Error("Compounding frequency must be a positive number");


//     //grace period months is a number greater than zero
//   if (
//     typeof loanData.gracePeriodMonths !== "number" ||
//     loanData.gracePeriodMonths < 0
//   )
//     throw new Error("Grace period must be zero or positive");

//     //balloon payment is a number greater than zero
//   if (
//     loanData.balloonPayment !== null &&
//     (typeof loanData.balloonPayment !== "number" || loanData.balloonPayment < 0)
//   )
//     throw new Error("Balloon payment must be zero or positive");

//     //allowed types for loan types
//   const allowedLoanTypes = [
//     "personal",
//     "mortgage",
//     "auto",
//     "education",
//     "business",
//   ];

//   //loanType is an allowed type and a string
//   if (
//     typeof loanData.loanType !== "string" ||
//     !allowedLoanTypes.includes(loanData.loanType.toLowerCase())
//   )
//     throw new Error(`Unsupported loan type: ${loanData.loanType}`);

//     //currency is a 3-letter ISO code.
//   if (
//     typeof loanData.currency !== "string" ||
//     !/^[A-Z]{3}$/.test(loanData.currency)
//   )
//     throw new Error("Currency must be a 3-letter ISO code (e.g., USD, EUR)");
// }


import { validateLoanInput } from "../../../../../actors/validators/loan/validateLoanInput.js";

describe("validateLoanInput(loanData)", () => {
  it("passes with valid loan data", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date("2025-01-01"),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).not.toThrow();
  });

  it("throws if loanData is null", () => {
    const loanData = null;
    expect(() => validateLoanInput(loanData)).toThrow("Invalid loan data received");
  });

  it("throws if id is missing", () => {
    const loanData = {
      id: null,
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Loan ID must be a string");
  });

  it("throws if financialProfileId is not a string", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: 123,
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Financial profile ID must be a string");
  });

  it("throws if startDate is invalid", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date("invalid"),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("startDate must be a valid Date object");
  });

  it("throws if termYears is NaN", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: NaN,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("termYears must be a valid number");
  });

  it("throws if principal is not a number", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: "100k",
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Principal must be a valid number");
  });

  it("throws if interestRate is zero", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 0,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Interest rate must be a positive number");
  });

  it("throws if paymentFrequencyPerYear is negative", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: -1,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Payment frequency must be a positive number");
  });

  it("throws if compoundingFrequencyPerYear is zero", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 0,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Compounding frequency must be a positive number");
  });

  it("throws if gracePeriodMonths is negative", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: -3,
      balloonPayment: null,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Grace period must be zero or positive");
  });

  it("throws if balloonPayment is negative", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: -5000,
      loanType: "personal",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Balloon payment must be zero or positive");
  });

  it("throws if loanType is unsupported", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "crypto",
      currency: "USD"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Unsupported loan type: crypto");
  });

  it("throws if currency is not a 3-letter ISO code", () => {
    const loanData = {
      id: "loan-001",
      financialProfileId: "fp-123",
      startDate: new Date(),
      termYears: 5,
      principal: 100000,
      interestRate: 4.5,
      paymentFrequencyPerYear: 12,
      compoundingFrequencyPerYear: 12,
      gracePeriodMonths: 0,
      balloonPayment: null,
      loanType: "personal",
      currency: "usd"
    };
    expect(() => validateLoanInput(loanData)).toThrow("Currency must be a 3-letter ISO code (e.g., USD, EUR)");
  });
});