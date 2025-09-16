function calculateRepaymentCapacity(user, years){
    //Supposing that the maximum term time period is 30 years
    if (user == null || years == null){
        throw new Error('Invalid input received.');
    }
    if (years <=0 || years >= 30){
        throw new Error('Invalid input received.');
    }
    years = Number(years);
    if (isNaN(years)) throw new Error('Invalid input received');
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
    const {principal, interestRate, termYears, paymentFrecuency} = loan;
    const schedule = [];
    const payment = fixedPaymentCalculation(loan);
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
    return schedule;
}

function calculateInterestSaving(schedule, earlyRepaymentPeriod){
    const futurePayments = schedule.slice(earlyRepaymentPeriod);
    const interestSaved = futurePayments.reduce((sum, period)=>sum+=period.interest,0);
    return parseFloat(interestSaved).toFixed(2);
}



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


//--------------------------------------------------------------------
function runTest(label, user, years, expectedValue) {
  try {
    const result = calculateRepaymentCapacity(user, years);
    const match = result === expectedValue;
    if (match) {
      console.log(`✅ ${label} → result: ${result}`);
    } else {
      console.error(`❌ ${label} → expected: ${expectedValue}, got: ${result}`);
    }
  } catch (err) {
    if (expectedValue === "error") {
      console.log(`✅ ${label} → threw error`);
    } else {
      console.error(`❌ ${label} → threw error unexpectedly`);
    }
  }
}

const validUser = { annualSalary: 50000, paymentRatio: 0.3 };

const testCases = [
  // ✅ Casos válidos
  ["valid input (10 years)", validUser, 10, 150000],
  ["valid input (1 year)", validUser, 1, 15000],
  ["valid input (29 years)", validUser, 29, 435000],

  // ❌ years fuera de rango
  ["years = 0", validUser, 0, "error"],
  ["years = 30", validUser, 30, "error"],
  ["years = -5", validUser, -5, "error"],
  ["years = 100", validUser, 100, "error"],

  // ❌ years malformado
  ["years = null", validUser, null, "error"],
  ["years = undefined", validUser, undefined, "error"],
  ["years = '10'", validUser, "10", 150000],
  ["years = object", validUser, { years: 10 }, "error"],

  // ❌ user malformado
  ["user = null", null, 10, "error"],
  ["user = undefined", undefined, 10, "error"],
  ["user missing annualSalary", { paymentRatio: 0.3 }, 10, "error"],
  ["user missing paymentRatio", { annualSalary: 50000 }, 10, "error"],
  ["user with zero salary", { annualSalary: 0, paymentRatio: 0.3 }, 10, 0],
  ["user with zero ratio", { annualSalary: 50000, paymentRatio: 0 }, 10, 0],
  ["user with negative salary", { annualSalary: -50000, paymentRatio: 0.3 }, 10, -150000],
  ["user with negative ratio", { annualSalary: 50000, paymentRatio: -0.3 }, 10, -150000]
];

for (const [label, user, years, expectedValue] of testCases) {
  runTest(label, user, years, expectedValue);
}
