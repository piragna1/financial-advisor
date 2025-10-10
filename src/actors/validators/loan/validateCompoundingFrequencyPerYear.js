export function validateCompoundingFrequencyPerYear(compoundingFrequencyPerYear){
    if (
    typeof loanData.compoundingFrequencyPerYear !== "number" ||
    loanData.compoundingFrequencyPerYear <= 0
  )
    throw new Error("Compounding frequency must be a positive number");

}