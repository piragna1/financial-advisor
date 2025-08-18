function calculateRepaymentCapacity(user, years){
    //Supposing that the maximum term time period is 30 years
    if (user == null || years == null){
        throw new Error('Invalid input received.');
    }
    if (years <=0 || years >= 30){
        throw new Error('Invalid input received.');
    }
    const annualRepaymentCapacity = user.annualSalary*user.paymentRatio; //discounting the interest to the annual salary
    //annualRepaymentCapacity * years = maxRepaymentCapacity
    const repaymentCapacity = annualRepaymentCapacity*years;
    console.log(`User repayment capacity over ${years} years: $${repaymentCapacity.toLocaleString()}`);
    return repaymentCapacity;
}

function calculateMaxLoanCapacity(loan){
    const {repaymentCapacity, loanTermYears, interestRate} = loan;
    if (repaymentCapacity == null || loanTermYears == null ||interestRate == null) {
        throw new Error('Invalid input received.');
    }
    if (repaymentCapacity <=0 || loanTermYears <=0 || interestRate <= 0){
        throw new Error('Invalid input received.')
    }
    const maxLoanCapacity = repaymentCapacity/(1+interestRate);
    console.log(`User max loan capacity over ${loanTermYears} years: $${maxLoanCapacity.toLocaleString()} with an interest rate of % ${interestRate*100}.`);
    return maxLoanCapacity;
};

function calculateCompoundInterest(loan){
    const { principal, annualRate, years, compoundsPerYear } = loan;
    if (
        principal<=0 ||
        annualRate <= 0 ||
        years <= 0 ||
        compoundsPerYear <=0
    ) {
        throw new Error('Invalid input received.');
    };

    const ratePerPeriod = annualRate/compoundsPerYear;
    const totalPeriods = compoundsPerYear * years;
    const totalAmount = principal * Math.pow(1 + ratePerPeriod, totalPeriods);

    return {
        totalAmount:parseFloat(totalAmount.toFixed(2)),
        interestAccrued: parseFloat((totalAmount-principal).toFixed(2))       
    };
}


function fixedPaymentCalculation(loan){
    const {principal, annualRate, totalPeriodsPerYear, years} = loan;
    const r = annualRate/totalPeriodsPerYear; //Rate value for individual periods.
    const n = years * totalPeriodsPerYear; //Total number of payments
    
    //Loan Payment Formula:
    return (r* principal) / (1- Math.pow(1+r, -n));
}

function generateAmortizationSchedule(loan){
    const {principal, annualRate, totalPeriodsPerYear, years} = loan;
    const schedule = [];
    const payment = fixedPaymentCalculation(loan);
    let balance = principal;
    for (let i = 1; i< years*totalPeriodsPerYear; i++){
        const interest = balance * (annualRate/totalPeriodsPerYear);
        const principalPaid = payment-interest;
        balance-=principalPaid;
        schedule.push({
            period:i,
            payment:payment,
            interest:interest,
            principal:principalPaid,
            balance:Math.balance(balance,0)
        });
    }
    return schedule;
}


/*Validation purposes:
const totalPaid = schedule.reduce((sum, p) => sum + p.payment, 0);
const totalPrincipal = schedule.reduce((sum, p) => sum + p.principal, 0);
const totalInterest = schedule.reduce((sum, p) => sum + p.interest, 0);
totalPaid === totalPrincipal + totalInterest
payment === principal + interest
*/