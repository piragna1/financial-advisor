import { v4 } from "uuid";

export function buildLoanEntity(data) {


    if (!data || typeof data !== "object") {
        throw new Error("Invalid input: data must be an object");
    }


    if (!data.financialProfileId)
        throw new Error('Financial profile id missing');
    if (
        typeof data.principal !== 'number' ||
        data.principal <= 0
    )
        throw new Error('Invalid principal input')
    if (
        typeof data.interestRate !== 'number' ||
        data.interestRate <= 0
    )
        throw new Error("Invalid interest rate input")
    if ("termYears" in data && (typeof data.termYears !== "number" || data.termYears <= 0)) {
        throw new Error("Invalid termYears input");
    }
    if ("startDate" in data) {
        const parsed = new Date(data.startDate);
        if (isNaN(parsed.getTime())) throw new Error("Invalid startDate input");
    }
    if ("balloonPayment" in data && typeof data.balloonPayment !== "number") {
        throw new Error("Invalid balloonPayment input");
    }



    return {
        id: v4(),
        financialProfileId: data.financialProfileId,
        startDate: data.startDate || Date.now(),
        termYears: data.termYears || 1,
        principal: data.principal,
        interestRate: data.interestRate,
        paymentFrequencyPerYear: data.paymentFrequencyPerYear || 12,
        compoundingFrequencyPerYear: data.compoundingFrequencyPerYear || 12,
        gracePeriodMonths: data.gracePeriodMonths ?? 0,
        balloonPayment: data.hasOwnProperty("balloonPayment") ? data.balloonPayment : 0,
        loanType: data.loanType || 'personal',
        currency: data.currency || 'USD',
        savedAt: new Date()
    }
}