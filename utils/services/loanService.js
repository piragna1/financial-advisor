function calculateRepaymentCapacity(user, loanTermYears){
    const annualRepaymentCapacity = user.annualSalary*user.paymentRatio; //discounting the interest to the annual salary
    //annualRepaymentCapacity * years = maxRepaymentCapacity
    const repaymentCapacity = annualRepaymentCapacity*loanTermYears;
    console.log(`User repayment capacity over ${loanTermYears} years: $${repaymentCapacity.toLocaleString()}`);
    return repaymentCapacity;
}

function calculateMaxLoanCapacity(repaymentCapacity, loanTermYears, interestRate){
    const maxLoanCapacity = repaymentCapacity/(1+interestRate);
    console.log(`User max loan capacity over ${loanTermYears} years: $${maxLoanCapacity.toLocaleString()} with an interest rate of % ${interestRate*100}.`);
    return maxLoanCapacity;
};

function calculateCompoundInterest(loan){
    if (
        loan.principal<=0 ||
        loan.annualRate <= 0 ||
        loan.years <= 0 ||
        loan.compoundsPerYear <=0
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