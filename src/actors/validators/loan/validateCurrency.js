export function validateCurrency(currency){
    if (
    typeof loanData.currency !== "string" ||
    !/^[A-Z]{3}$/.test(loanData.currency)
  )
    throw new Error("Currency must be a 3-letter ISO code (e.g., USD, EUR)");
}