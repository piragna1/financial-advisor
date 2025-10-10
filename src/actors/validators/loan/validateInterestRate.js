export function validateInterestRate(interestRat){
    
  if (typeof loanData.interestRate !== "number" || loanData.interestRate <= 0)
    throw new Error("Interest rate must be a positive number");
}