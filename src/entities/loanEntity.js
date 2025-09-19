import { v4 } from "uuid";

export function buildLoanEntity(data){
    if (!data.financialProfileId)
        throw new Error('Financial profile id missing');
    if(
        typeof data.principal !== 'number' || 
        data.principal <=0
    ) 
        throw new Error('Invalid principal input')
    if (
        typeof data.interestRate !== 'number' || 
        data.interestRate <=0
    )
        throw new Error("Invalid interest rate input")
    return {
        id:v4(),
        financialProfileId:data.financialProfileId,
        startDate: data.startDate || Date.now(),
        termYears: data.termYears || 1,
        principal:data.principal,
        interestRate:data.interestRate,
        paymentFrequencyPerYear: data.paymentFrequencyPerYear || 12,
        compoundingFrequencyPerYear:data.compoundingFrequencyPerYear || 12,
        gracePeriodMonths: data.gracePeriodMonths ?? 0,
        balloonPayment: data.balloonPayment ?? 0,
        loanType: data.loanType || 'personal',
        currency: data.currency || 'USD'
    }
}