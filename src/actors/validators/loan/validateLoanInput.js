import {AppError} from '../../../errors/AppError.js'
import { LoanErrors } from '../../../errors/loanErrors.js';
export function validateLoanInput(loan){
    if (!loan || typeof loan !== 'object') throw new AppError(LoanErrors.INVALID_STRUCTURE);
    if (!loan.id) throw new AppError(LoanErrors.INVALID_LOAN_ID);
    if (!loan.financialProfileId) throw new AppError(LoanErrors.INVALID_FINANCIAL_PROFILE_ID);
    if (!loan.startDate || typeof loan.startDate !== 'number') throw new AppError(LoanErrors.VALIDATION.INVALID_START_DATE);
    if (typeof loan.termYears !== 'number' || loan.termYears <= 0) throw new AppError(LoanErrors.VALIDATION.INVALID_TERM)
    if (typeof loan.principal !== 'number' || loan.principal <=0 ) throw new AppError(LoanErrors.VALIDATION.INVALID_PRINCIPAL);
    if (typeof loan.interestRate !== 'number' || loan.interestRate<=0) throw new AppError(LoanErrors.VALIDATION.INVALID_RATE)
    if (typeof loan.paymentFrequencyPerYear !== 'number' || loan.paymentFrequencyPerYear <= 0) throw new AppError(LoanErrors.VALIDATION.INVALID_PAYMENT_FREQUENCY);
    if (typeof loan.compoundingFrequencyPerYear !== 'number' || loan.compoundingFrequencyPerYear <=0) throw new AppError(LoanErrors.VALIDATION.INVALID_COMPOUNDING_FREQUENCY);
    if (typeof loan.gracePeriodMonths !== 'number' || loan.gracePeriodMonths < 0)throw new AppError(LoanErrors.VALIDATION.INVALID_GRACE_PERIOD);
    if (typeof loan.balloonPayment !== 'number' || loan.balloonPayment < 0) throw new AppError(LoanErrors.VALIDATION.INVALID_BALLOON_PAYMENT);
    if (!loan.loanType || typeof loan.loanType !== 'string') throw new AppError(LoanErrors.VALIDATION.INVALID_LOAN_TYPE);
    if (!loan.currency || typeof loan.currency !== 'string') throw new AppError(LoanErrors.VALIDATION.INVALID_CURRENCY);
}