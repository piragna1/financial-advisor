const loan = {
    principal:100000, //amount borrowed,
    interestRate:5.0, //anual interest rate in %
    termYears:15, //duration of loan in years
    paymentFrecuency: 'monthly', //monthly, biweekly...
    startDate: '2025-08-01' //loan start date    
};

//loan object:
const interestRate=0.25; //is in object
const loanTermYears = 1; //is in obj
const interestBuffer = 0.25;// ins in obj

//user data:
const user = {
    annualSalary:60000,
    paymentRatio : 0.20
};

function calculateRepaymentCapacity(user, loanTermYears){
    const annualRepaymentCapacity = user.annualSalary*user.paymentRatio; //discounting the interest to the annual salary
    //annualRepaymentCapacity * years = maxRepaymentCapacity
    const repaymentCapacity = annualRepaymentCapacity*loanTermYears;
    console.log(`User repayment capacity over ${loanTermYears} years: $${repaymentCapacity.toLocaleString()}`);
    return repaymentCapacity;
}

function calculateMaxLoanCapacity(repaymentCapacity, loanTermYears, interestRate){
    //maxium affordable price->repaymentCapacity
    const totalRepaymentCapacity = repaymentCapacity;
    const maxLoanCapacity = totalRepaymentCapacity/(1+interestRate);
    console.log(`User max loan capacity over ${loanTermYears} years: $${maxLoanCapacity.toLocaleString()} with an interest rate of % ${interestRate*100}.`);
    return maxLoanCapacity;
};

//loanTermYears=1 
//interestRate=0.25
calculateMaxLoanCapacity(calculateRepaymentCapacity(user,loanTermYears),loanTermYears,interestRate);//User max loan capacity over 1 years: $9,000

function calculateCompoundInterest({principal, annualRate, years, compoundsPerYear}){
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