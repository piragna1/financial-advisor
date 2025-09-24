export function validateLoanUpdate(updates) {
  const columnMap = {
    financialProfileId: "financial_profile_id",
    startDate: "start_date",
    termYears: "term_years",
    principal: "principal",
    interestRate: "interest_rate",
    paymentFrequencyPerYear: "payment_frequency_per_year",
    compoundingFrequencyPerYear: "compounding_frequency_per_year",
    gracePeriodMonths: "grace_period_months",
    balloonPayment: "balloon_payment",
    loanType: "loan_type",
    currency: "currency",
    savedAt: "saved_at",
    updatedAt: "updated_at",
  };

  if (typeof updates !== "object" || updates === null)
    throw new Error("Updates must be a non-null object");

  for (const [key, value] of Object.entries(updates)) {
    const column = columnMap[key];
    if (!column) {
      switch (key) {
        case "financialProfileId":
          if (typeof value !== "string" || value.trim() === "")
            throw new Error("financialProfileId must be a non-empty string");
          break;

        case "startDate":
          if (isNaN(Date.parse(value)))
            throw new Error("startDate must be a valid date");
          break;

        case "termYears":
          if (typeof value !== "number" || value <= 0)
            throw new Error("termYears must be a positive number");
          break;

        case "principal":
          if (typeof value !== "number" || value <= 0)
            throw new Error("principal must be a positive number");
          break;

        case "interestRate":
          if (typeof value !== "number" || value < 0 || value > 100)
            throw new Error("interestRate must be between 0 and 100");
          break;

        case "paymentFrequencyPerYear":
          if (typeof value !== "number" || value <= 0)
            throw new Error(
              "paymentFrequencyPerYear must be a positive number"
            );
          break;

        case "compoundingFrequencyPerYear":
          if (typeof value !== "number" || value <= 0)
            throw new Error(
              "compoundingFrequencyPerYear must be a positive number"
            );
          break;

        case "gracePeriodMonths":
          if (typeof value !== "number" || value < 0)
            throw new Error("gracePeriodMonths must be a non-negative number");
          break;

        case "balloonPayment":
          if (typeof value !== "number" || value < 0)
            throw new Error("balloonPayment must be a non-negative number");
          break;

        case "loanType":
          if (typeof value !== "string" || value.trim() === "")
            throw new Error("loanType must be a non-empty string");
          break;

        case "currency":
          if (typeof value !== "string" || value.trim().length !== 3)
            throw new Error("currency must be a 3-letter code");
          break;

        case "savedAt":
        case "updatedAt":
          if (isNaN(Date.parse(value)))
            throw new Error(`${key} must be a valid date`);
          break;

        default:
          throw new Error(`Invalid update field: ${key}`);
      }
    }
  }
}
