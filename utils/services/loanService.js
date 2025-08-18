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