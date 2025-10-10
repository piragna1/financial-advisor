export function validateBalloonPayment(balloonPayment){
    if (
    loanData.balloonPayment !== null &&
    (typeof loanData.balloonPayment !== "number" || loanData.balloonPayment < 0)
  )
    throw new Error("Balloon payment must be zero or positive");
}