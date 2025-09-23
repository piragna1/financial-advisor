export const loan = {
    id:String,
    financialProfileId:String,
    startDate: Date,
    termYears:Number,
    principal:Number,
    interestRate:Number,
    paymentFrecuencyPerYear: Number,
    compoundingFrequencyPerYear:Number,
    gracePeriodMonths:Number,
    balloonPayment:Number,
    loanType:String,
    currency:String,
    savedAt:Date
};