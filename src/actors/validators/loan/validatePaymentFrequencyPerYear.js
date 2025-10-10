export function validatePaymentFrequencyPerYear(paymentFrequencyPerYear){
    if (
    typeof loanData.paymentFrequencyPerYear !== "number" ||
    loanData.paymentFrequencyPerYear <= 0
  )
    throw new Error("Payment frequency must be a positive number");
}