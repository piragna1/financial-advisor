export function validateLoanInput(loan){
    if (!loan || typeof loan !== 'object') throw new Error("Invalid loan structure received");
    if (!loan.id) throw new Error("Invalid loan id");
    if (!loan.financialProfileId) throw new Error("Invalid financial profile id");
    if (!loan.startDate || typeof loan.startDate !== 'number') throw new Error("Invalid start date value received");
    if (typeof loan.termYears !== 'number' || loan.termYears <= 0) throw new Error("Invalid term years value received");
    if (typeof loan.principal !== 'number' || loan.principal <=0 ) throw new Error("Invalid principal received");
    if (typeof loan.interestRate !== 'number' || loan.interestRate<=0) throw new Error("Invalid loan's interest rate value received");
    if (typeof loan.paymentFrequencyPerYear !== 'number' || loan.paymentFrequencyPerYear <= 0) throw new Error("Invalid payment frequency per year received");
    if (typeof loan.compoundingFrequencyPerYear !== 'number' || loan.compoundingFrequencyPerYear <=0) throw new Error("Invalid compounding frequency per year received");
    if (typeof loan.gracePeriodMonths !== 'number' || loan.gracePeriodMonths < 0)throw new Error("Invalid grace periods' value received");
    if (typeof loan.balloonPayment !== 'number' || loan.balloonPayment < 0) throw new Error("Invalid balloon payment's value received");
    if (!loan.loanType || typeof loan.loanType !== 'string') throw new Error("Invalid loan type received");
    if (!loan.currency || typeof loan.currency !== 'string') throw new Error('Invalid currency received');
}