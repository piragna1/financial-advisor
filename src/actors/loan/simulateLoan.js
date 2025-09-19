import {fixedPaymentCalculation,generateAmortizationSchedule,calculateRepaymentCapacity} from '../../../services/loan/loanCalculator.js'

//simulateLoan.js
export function simulateLoan(input, financialProfile){
    validateLoanInput(input); // requires implementation right now
    const {principal, termYears, interestRate} = input;
    const monthlyPayment = fixedPaymentCalculation(principal,termYears,interestRate);//import needed
    const schedule = generateAmortizationSchedule(principal, termYears, interestRate); //import needeed
    const repaymentCapacity = calculateRepaymentCapacity(financialProfile.salary, termYears);

    return {
        monthlyPayment,
        totalCost:monthlyPayment*termYears*12,
        schedule,
        repaymentCapacity,
        affordable:monthlyPayment<=repaymentCapacity
    };
}