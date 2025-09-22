export function validateLoanInput(loan){
    if (!loan || typeof loan !== 'object') throw new Error("Invalid loan structure received");
    if (!loan.id) throw new Error("Invalid loan id");
    if (!loan.financialProfileId) throw new Error("Invalid financial profile id");
    if (!loan.startDate) loan.startDate = Date.now();
    if (typeof loan.termYears !== 'number' || loan.termYears <= 0) loan.termYears = 1;
    if (typeof loan.principal !== 'number' || loan.principal <=0 ) loan.principal = 25000;
    if (typeof loan.interestRate !== 'number' || loan.interestRate<=0) loan.interestRate = 0.05;
    if (typeof loan.paymentFrequencyPerYear !== 'number' || loan.paymentFrequencyPerYear <= 0) paymentFrequencyPerYear = 12;
    if (typeof loan.compoundingFrequencyPerYear !== 'number') // check
    if (typeof loan.gracePeriodMonths !== 'number' || loan.gracePeriodMonths < 0) loan.gracePeriodMonths = 0;
    if (typeof loan.balloonPayment !== 'number' || loan.balloonPayment < 0) loan.balloonPayment = 0;
    if (!loan.loanType || typeof loan.loanType !== 'string') throw new Error("Invalid loan type received");
    if (!loan.currency || typeof loan.currency !== 'string') throw new Error('Invalid currency received');
    //currency
}