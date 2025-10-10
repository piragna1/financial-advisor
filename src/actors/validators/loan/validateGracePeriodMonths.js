export function validateGracePeriodMonths(gracePeriodMonths){
    if (
    typeof loanData.gracePeriodMonths !== "number" ||
    loanData.gracePeriodMonths < 0
  )
    throw new Error("Grace period must be zero or positive");
}