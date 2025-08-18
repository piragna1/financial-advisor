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
    console.log('Entered in fixedPaymentCalculation execution:')
    console.log('loan',loan)
    const {principal, interestRate, termYears, paymentFrecuency} = loan;
    const r = interestRate/paymentFrecuency; //Rate value for individual periods.
    const n = termYears * paymentFrecuency; //Total number of payments
    
    //Loan Payment Formula:
    console.log('Loan Payment Formula result:',(r* principal) / (1- Math.pow(1+r, -n)))
    return (r* principal) / (1- Math.pow(1+r, -n));
}


/* paymentBreakdownOnPeriod: 
{
            period:i,
            payment:payment,
            interest:interest,
            principal:principalPaid,
            balance:Math.balance(balance,0)
        }*/
function generateAmortizationSchedule(loan){
    console.log('start generateAmortizationSchedule')
    const {principal, interestRate, termYears, paymentFrecuency} = loan;
    const schedule = [];
    const payment = fixedPaymentCalculation(loan);
    console.log('payment:',payment)
    let balance = principal;
    for (let i = 1; i< termYears*paymentFrecuency; i++){
        const interest = balance * (interestRate/paymentFrecuency);
        const principalPaid = payment-interest;
        balance-=principalPaid;
        schedule.push({
            period:i,
            payment:payment,
            interest:interest,
            principal:principalPaid,
            balance:Math.max(balance,0)
        });
    }
    console.log('principal:',principal)
    console.log('interestRate:',interestRate)
    console.log('paymentFrecuency:',paymentFrecuency)
    console.log('termYears:',termYears)
    console.log('schedule:',schedule)
    console.log('END generateAmortizationSchedule')
    return schedule;
}

function calculateInterestSaving(schedule, earlyRepaymentPeriod){
    const futurePayments = schedule.slice(earlyRepaymentPeriod);
    const interestSaved = futurePayments.reduce((sum, period)=>sum+=period.interest,0);
    return parseFloat(interestSaved).toFixed(2);
}


/*Validation purposes:
const totalPaid = schedule.reduce((sum, p) => sum + p.payment, 0);
const totalPrincipal = schedule.reduce((sum, p) => sum + p.principal, 0);
const totalInterest = schedule.reduce((sum, p) => sum + p.interest, 0);
totalPaid === totalPrincipal + totalInterest
payment === principal + interest
*/

function applyEarlyRepayment(loan,schedule, earlyRepaymentPeriod){

    console.log('loan:',loan);
    console.log('schedule:',schedule);
    console.log('earlyRepaymentPeriod:',earlyRepaymentPeriod);



    const scheduleCopy = schedule.slice(0, earlyRepaymentPeriod-1);
    const periodBreakdown = schedule[earlyRepaymentPeriod-1];
    const periodBreakdownCopy = {
        period:earlyRepaymentPeriod,
        payment:periodBreakdown.balance,
        interest:0, // I am not sure here
        principal:periodBreakdown.balance, //100% of payment is under principal?
        balance:0//reduce the current remaining balance to 0
    };
    scheduleCopy[earlyRepaymentPeriod-1] = periodBreakdownCopy;
    loan['earlyRepaymentPeriod'] = earlyRepaymentPeriod;
    const interestSaved = calculateInterestSaving(schedule,earlyRepaymentPeriod);
    return scheduleCopy;
};

//simulation
const loan = {
  principal: 100000,
  interestRate: 0.06,
  termYears: 2,
  paymentFrecuency: 12,
};

const schedule = generateAmortizationSchedule(loan);
    console.log('GENERATED SCHEDULE:',schedule);

const earlyRepaymentPeriod = 12; // after 1 years

const modifiedSchedule = applyEarlyRepayment(loan, schedule, earlyRepaymentPeriod);
const interestSaved = calculateInterestSaving(schedule, earlyRepaymentPeriod);

console.log("Interest saved:", interestSaved);
console.log("Modified schedule:", modifiedSchedule.slice(-3)); // last 3 entries
