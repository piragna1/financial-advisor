function calculateRepaymentCapacity(user, years) {
  //Supposing that the maximum term time period is 30 years
  if (user == null || years == null) {
    throw new Error("Invalid input received.");
  }
  if (years <= 0 || years >= 30) {
    throw new Error("Invalid input received.");
  }
  years = Number(years);
  if (isNaN(years)) throw new Error("Invalid input received");
  if (
    (!user.annualSalary && user.annualSalary !== 0) ||
    (!user.paymentRatio && user.paymentRatio !== 0)
  )
    throw new Error("The user has missing information.");
  const annualRepaymentCapacity = user.annualSalary * user.paymentRatio; //discounting the interest to the annual salary
  //annualRepaymentCapacity * years = maxRepaymentCapacity
  const repaymentCapacity = annualRepaymentCapacity * years;
  console.log(
    `User repayment capacity over ${years} years: $${repaymentCapacity.toLocaleString()}`
  );
  return repaymentCapacity;
}
function calculateMaxLoanCapacity(loan) {
  const repaymentCapacity = Number(loan.repaymentCapacity);
  const loanTermYears = Number(loan.loanTermYears);
  const interestRate = Number(loan.interestRate);
  if (!repaymentCapacity || !loanTermYears || !interestRate) {
    throw new Error("Invalid input received.");
  }
  if (isNaN(repaymentCapacity) || isNaN(loanTermYears) || isNaN(interestRate))
    throw new Error("Invalid input received.");
  if (repaymentCapacity <= 0 || loanTermYears <= 0 || interestRate <= 0) {
    throw new Error("Invalid input received.");
  }
  const maxLoanCapacity = repaymentCapacity / (1 + interestRate);
  console.log(
    `User max loan capacity over ${loanTermYears} years: $${maxLoanCapacity.toLocaleString()} with an interest rate of % ${
      interestRate * 100
    }.`
  );
  return Math.round(maxLoanCapacity).toFixed(0);
}
function calculateCompoundInterest(loan) {
  const principal = Number(loan.principal);
  const annualRate = Number(loan.annualRate);
  const years = Number(loan.years);
  const compoundsPerYear = Number(loan.compoundsPerYear);
  if (!principal || !annualRate || !years || !compoundsPerYear)
    throw new Error("Invalid input received.");
  if (
    isNaN(principal) ||
    isNaN(annualRate) ||
    isNaN(years) ||
    isNaN(compoundsPerYear)
  )
    throw new Error("Invalid input received.");
  if (
    principal <= 0 ||
    annualRate <= 0 ||
    years <= 0 ||
    compoundsPerYear <= 0
  ) {
    throw new Error("Invalid input received.");
  }

  const ratePerPeriod = annualRate / compoundsPerYear;
  const totalPeriods = compoundsPerYear * years;
  const totalAmount = principal * Math.pow(1 + ratePerPeriod, totalPeriods);

  return {
    totalAmount: Math.round(parseFloat(totalAmount)),
    interestAccrued: Math.round(parseFloat(totalAmount - principal)),
  };
}
function fixedPaymentCalculation(loan) {
  console.log("Entered in fixedPaymentCalculation execution:");
  if (!loan.principal || !loan.interestRate || !loan.termYears || !loan.paymentFrecuency)
    throw new Error("Invalid input received.");
  const principal = Number(loan.principal);
  const interestRate = Number(loan.interestRate);
  const termYears = Number(loan.termYears);
  const paymentFrecuency = Number(loan.paymentFrecuency);
  
  if (
    isNaN(principal) ||
    isNaN(interestRate) ||
    isNaN(termYears) ||
    isNaN(paymentFrecuency)
  )
    throw new Error("Invalid input received.");
  if (
    principal <= 0 ||
    interestRate <= 0 ||
    termYears <= 0 ||
    paymentFrecuency <= 0
  )
    throw new Error("Invalid input received.");

  const r = interestRate / paymentFrecuency; //Rate value for individual periods.
  const n = termYears * paymentFrecuency; //Total number of payments

  //Loan Payment Formula:
  console.log(
    "Loan Payment Formula result:",
    (r * principal) / (1 - Math.pow(1 + r, -n))
  );
  return (r * principal) / (1 - Math.pow(1 + r, -n));
}
/* paymentBreakdownOnPeriod: 
{
            period:i,
            payment:payment,
            interest:interest,
            principal:principalPaid,
            balance:Math.balance(balance,0)
        }*/
function generateAmortizationSchedule(loan) {
  if (!loan.principal || !loan.interestRate || !loan.termYears || !loan.paymentFrecuency)
    throw new Error("Invalid input received.");
  const principal = Number(loan.principal);
  const interestRate = Number(loan.interestRate);
  const termYears = Number(loan.termYears);
  const paymentFrecuency = Number(loan.paymentFrecuency);

  //validations

  if (
    isNaN(principal) ||
    isNaN(interestRate) ||
    isNaN(termYears) ||
    isNaN(paymentFrecuency)
  )
    throw new Error("Invalid input received.");

  if (
    principal <= 0 ||
    interestRate <= 0 ||
    termYears <= 0 ||
    paymentFrecuency <= 0
  )
    throw new Error("Invalid input received.");

  const schedule = [];

  const payment = fixedPaymentCalculation(loan);

  let balance = principal;

  for (let i = 1; i < (termYears * paymentFrecuency)+1; i++) {
    const interest = balance * (interestRate / paymentFrecuency);
    const principalPaid = payment - interest;
    balance -= principalPaid;
    schedule.push({
      period: i,
      payment: payment,
      interest: interest,
      principal: principalPaid,
      balance: Math.max(balance, 0),
    });
  }
  return schedule;
}
function calculateInterestSaving(schedule, earlyRepaymentPeriod) {
  if(!schedule || !earlyRepaymentPeriod ) 
    throw new Error('Invalid input data received.');

  earlyRepaymentPeriod = Number(earlyRepaymentPeriod);
  if (isNaN(earlyRepaymentPeriod)||earlyRepaymentPeriod<=0)
    throw new Error('Invalid early repayment period received.');
  const totalInterest = schedule.reduce((sum,period) =>sum+ period.interest,0);
  const interestPaid = schedule
    .slice(0, earlyRepaymentPeriod)
    .reduce((sum,p) => sum+p.interest,0);
  const interestSaved = totalInterest - interestPaid;
  return parseFloat(interestSaved).toFixed(2);
}
function applyEarlyRepayment(loan, schedule, earlyRepaymentPeriod) {

  const scheduleCopy = schedule.slice(0, earlyRepaymentPeriod - 1);
  const periodBreakdown = schedule[earlyRepaymentPeriod - 1];
  const periodBreakdownCopy = {
    period: earlyRepaymentPeriod,
    payment: periodBreakdown.balance,
    interest: 0, // I am not sure here
    principal: periodBreakdown.balance, //100% of payment is under principal?
    balance: 0, //reduce the current remaining balance to 0
  };
  scheduleCopy[earlyRepaymentPeriod - 1] = periodBreakdownCopy;
  loan["earlyRepaymentPeriod"] = earlyRepaymentPeriod;
  const interestSaved = calculateInterestSaving(schedule, earlyRepaymentPeriod);
  return scheduleCopy;
}
//--------------------------------------------------------------------Test suite
/* function runTest(label, user, years, expectedValue) {
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
 */
//-------
/* 
function assertMaxLoanCapacityCalculation(label, loan, expectedValue) {
  try {
    const result = calculateMaxLoanCapacity(loan);
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

const testCases = [
  // ✅ Casos válidos (ahora comparando contra strings)
  ["valid input (repayment 100k, rate 0.05)", { repaymentCapacity: 100000, loanTermYears: 10, interestRate: 0.05 }, "95238"],
  ["valid input (repayment 50k, rate 0.1)", { repaymentCapacity: 50000, loanTermYears: 5, interestRate: 0.1 }, "45454"],
  ["valid input (repayment 1, rate 0.01)", { repaymentCapacity: 1, loanTermYears: 1, interestRate: 0.01 }, "1"],

  // ❌ Valores extremos
  ["interestRate = 1", { repaymentCapacity: 100000, loanTermYears: 10, interestRate: 1 }, "50000"],
  ["interestRate = 0.0001", { repaymentCapacity: 100000, loanTermYears: 10, interestRate: 0.0001 }, "99990"],

  // ❌ Valores inválidos
  ["repaymentCapacity = 0", { repaymentCapacity: 0, loanTermYears: 10, interestRate: 0.05 }, "error"],
  ["loanTermYears = 0", { repaymentCapacity: 100000, loanTermYears: 0, interestRate: 0.05 }, "error"],
  ["interestRate = 0", { repaymentCapacity: 100000, loanTermYears: 10, interestRate: 0 }, "error"],
  ["repaymentCapacity = -100", { repaymentCapacity: -100, loanTermYears: 10, interestRate: 0.05 }, "error"],
  ["interestRate = -0.05", { repaymentCapacity: 100000, loanTermYears: 10, interestRate: -0.05 }, "error"],

  // ❌ Campos faltantes
  ["missing repaymentCapacity", { loanTermYears: 10, interestRate: 0.05 }, "error"],
  ["missing loanTermYears", { repaymentCapacity: 100000, interestRate: 0.05 }, "error"],
  ["missing interestRate", { repaymentCapacity: 100000, loanTermYears: 10 }, "error"],

 // ✅ Tipos convertibles (antes marcados como incorrectos)
["repaymentCapacity = '100000'", { repaymentCapacity: "100000", loanTermYears: 10, interestRate: 0.05 }, "95238"],
["interestRate = '0.05'", { repaymentCapacity: 100000, loanTermYears: 10, interestRate: "0.05" }, "95238"],
["loanTermYears = '10'", { repaymentCapacity: 100000, loanTermYears: "10", interestRate: 0.05 }, "95238"],

];

for (const [label, loan, expectedValue] of testCases) {
  assertMaxLoanCapacityCalculation(label, loan, expectedValue);
}
 */
//-------
/* function assertCompoundInterestCalculation(label, loan, expected) {
  try {
    const result = calculateCompoundInterest(loan);
    const match =
      result.totalAmount === expected.totalAmount &&
      result.interestAccrued === expected.interestAccrued;

    if (match) {
      console.log(`✅ ${label} → total: ${result.totalAmount}, interest: ${result.interestAccrued}`);
    } else {
      console.error(`❌ ${label} → expected total: ${expected.totalAmount}, interest: ${expected.interestAccrued}, got total: ${result.totalAmount}, interest: ${result.interestAccrued}`);
    }
  } catch (err) {
    if (expected === "error") {
      console.log(`✅ ${label} → threw error`);
    } else {
      console.error(`❌ ${label} → threw error unexpectedly`);
    }
  }
}

const testCases = [
  // ✅ Casos válidos
  ["standard input", { principal: 10000, annualRate: 0.05, years: 5, compoundsPerYear: 12 }, { totalAmount: 12834, interestAccrued: 2834 }],
  ["quarterly compounding", { principal: 5000, annualRate: 0.04, years: 10, compoundsPerYear: 4 }, { totalAmount: 7444, interestAccrued: 2444 }],
  ["annual compounding", { principal: 2000, annualRate: 0.06, years: 3, compoundsPerYear: 1 }, { totalAmount: 2382, interestAccrued: 382 }],
  ["daily compounding", { principal: 1000, annualRate: 0.03, years: 1, compoundsPerYear: 365 }, { totalAmount: 1030, interestAccrued: 30 }],

  // ✅ Tipos convertibles
  ["string inputs", { principal: "10000", annualRate: "0.05", years: "5", compoundsPerYear: "12" }, { totalAmount: 12834, interestAccrued: 2834 }],

  // ❌ Valores inválidos
  ["principal = 0", { principal: 0, annualRate: 0.05, years: 5, compoundsPerYear: 12 }, "error"],
  ["annualRate = 0", { principal: 10000, annualRate: 0, years: 5, compoundsPerYear: 12 }, "error"],
  ["years = 0", { principal: 10000, annualRate: 0.05, years: 0, compoundsPerYear: 12 }, "error"],
  ["compoundsPerYear = 0", { principal: 10000, annualRate: 0.05, years: 5, compoundsPerYear: 0 }, "error"],
  ["negative principal", { principal: -10000, annualRate: 0.05, years: 5, compoundsPerYear: 12 }, "error"],
  ["negative rate", { principal: 10000, annualRate: -0.05, years: 5, compoundsPerYear: 12 }, "error"],
  ["negative years", { principal: 10000, annualRate: 0.05, years: -5, compoundsPerYear: 12 }, "error"],
  ["negative compounds", { principal: 10000, annualRate: 0.05, years: 5, compoundsPerYear: -12 }, "error"],

  // ❌ Tipos no convertibles
  ["principal = 'abc'", { principal: "abc", annualRate: 0.05, years: 5, compoundsPerYear: 12 }, "error"],
  ["annualRate = null", { principal: 10000, annualRate: null, years: 5, compoundsPerYear: 12 }, "error"],
  ["years = undefined", { principal: 10000, annualRate: 0.05, years: undefined, compoundsPerYear: 12 }, "error"],
  ["compoundsPerYear = object", { principal: 10000, annualRate: 0.05, years: 5, compoundsPerYear: {} }, "error"]
];

for (const [label, loan, expected] of testCases) {
  assertCompoundInterestCalculation(label, loan, expected);
} */
//-------
/*function assertFixedPaymentCalculation(label, loan, expectedValue) {
  try {
    const result = fixedPaymentCalculation(loan);
    const match = parseFloat(result.toFixed(2)) === expectedValue;
    if (match) {
      console.log(`✅ ${label} → result: ${result.toFixed(2)}`);
    } else {
      console.error(`❌ ${label} → expected: ${expectedValue}, got: ${result.toFixed(2)}`);
    }
  } catch (err) {
    if (expectedValue === "error") {
      console.log(`✅ ${label} → threw error`);
    } else {
      console.error(`❌ ${label} → threw error unexpectedly`);
    }
  }
}
const testCases = [
  // ✅ Casos válidos
  ["standard input (monthly)", { principal: 100000, interestRate: 0.05, termYears: 30, paymentFrecuency: 12 }, 536.82],
  ["quarterly payments", { principal: 50000, interestRate: 0.04, termYears: 15, paymentFrecuency: 4 }, 1110.64],
  ["annual payments", { principal: 20000, interestRate: 0.06, termYears: 10, paymentFrecuency: 1 }, 2710.68],

  // ✅ Tipos convertibles
  ["string inputs", { principal: "100000", interestRate: "0.05", termYears: "30", paymentFrecuency: "12" }, 536.82],

  // ❌ Valores inválidos
  ["principal = 0", { principal: 0, interestRate: 0.05, termYears: 30, paymentFrecuency: 12 }, "error"],
  ["interestRate = 0", { principal: 100000, interestRate: 0, termYears: 30, paymentFrecuency: 12 }, "error"],
  ["termYears = 0", { principal: 100000, interestRate: 0.05, termYears: 0, paymentFrecuency: 12 }, "error"],
  ["paymentFrecuency = 0", { principal: 100000, interestRate: 0.05, termYears: 30, paymentFrecuency: 0 }, "error"],
  ["negative principal", { principal: -100000, interestRate: 0.05, termYears: 30, paymentFrecuency: 12 }, "error"],
  ["negative rate", { principal: 100000, interestRate: -0.05, termYears: 30, paymentFrecuency: 12 }, "error"],
  ["negative term", { principal: 100000, interestRate: 0.05, termYears: -30, paymentFrecuency: 12 }, "error"],
  ["negative frequency", { principal: 100000, interestRate: 0.05, termYears: 30, paymentFrecuency: -12 }, "error"],

  // ❌ Tipos no convertibles
  ["principal = 'abc'", { principal: "abc", interestRate: 0.05, termYears: 30, paymentFrecuency: 12 }, "error"],
  ["interestRate = null", { principal: 100000, interestRate: null, termYears: 30, paymentFrecuency: 12 }, "error"],
  ["termYears = undefined", { principal: 100000, interestRate: 0.05, termYears: undefined, paymentFrecuency: 12 }, "error"],
  ["paymentFrecuency = object", { principal: 100000, interestRate: 0.05, termYears: 30, paymentFrecuency: {} }, "error"]
];

for (const [label, loan, expectedValue] of testCases) {
  assertFixedPaymentCalculation(label, loan, expectedValue);
}
*/
//-------
/* 
function assertScheduleStructure(label, loan, expectedLength) {
  try {
    const schedule = generateAmortizationSchedule(loan);

    const match = Array.isArray(schedule) && schedule.length === expectedLength;

    if (!match) {
      console.error(
        `❌ ${label} → expected length: ${expectedLength}, got: ${schedule.length}`
      );
      return;
    }

    const sample = schedule[0];
    const keys = ["period", "payment", "interest", "principal", "balance"];
    const hasAllKeys = keys.every((k) => Object.hasOwn(sample, k));
    if (!hasAllKeys) {
      console.error(`❌ ${label} → missing keys in schedule entry`);
      return;
    }

    console.log(`✅ ${label} → schedule length: ${expectedLength}, keys OK`);
    console.log(schedule[schedule.length-1]);

  } catch (err) {
    if (expectedLength === "error") {
      console.log(`✅ ${label} → threw error`);
    } else {
      console.error(`❌ ${label} → threw error unexpectedly`);
    }
  }
}
const testCases = [
  // ✅ Casos válidos
  {
    label: "standard input (monthly, 30y)",
    loan: {
      principal: 100000,
      interestRate: 0.05,
      termYears: 30,
      paymentFrecuency: 12,
    },
    expectedLength: 360,
  },
  {
    label: "quarterly payments (15y)",
    loan: {
      principal: 50000,
      interestRate: 0.04,
      termYears: 15,
      paymentFrecuency: 4,
    },
    expectedLength: 60,
  },
  {
    label: "annual payments (10y)",
    loan: {
      principal: 20000,
      interestRate: 0.06,
      termYears: 10,
      paymentFrecuency: 1,
    },
    expectedLength: 10,
  },

  // ✅ Tipos convertibles
  {
    label: "string inputs",
    loan: {
      principal: "100000",
      interestRate: "0.05",
      termYears: "30",
      paymentFrecuency: "12",
    },
    expectedLength: 360,
  },

  // ❌ Valores inválidos
  {
    label: "principal = 0",
    loan: {
      principal: 0,
      interestRate: 0.05,
      termYears: 30,
      paymentFrecuency: 12,
    },
    expectedLength: "error",
  },
  {
    label: "interestRate = 0",
    loan: {
      principal: 100000,
      interestRate: 0,
      termYears: 30,
      paymentFrecuency: 12,
    },
    expectedLength: "error",
  },
  {
    label: "termYears = 0",
    loan: {
      principal: 100000,
      interestRate: 0.05,
      termYears: 0,
      paymentFrecuency: 12,
    },
    expectedLength: "error",
  },
  {
    label: "paymentFrecuency = 0",
    loan: {
      principal: 100000,
      interestRate: 0.05,
      termYears: 30,
      paymentFrecuency: 0,
    },
    expectedLength: "error",
  },
  {
    label: "negative principal",
    loan: {
      principal: -100000,
      interestRate: 0.05,
      termYears: 30,
      paymentFrecuency: 12,
    },
    expectedLength: "error",
  },

  // ❌ Tipos no convertibles
  {
    label: "principal = 'abc'",
    loan: {
      principal: "abc",
      interestRate: 0.05,
      termYears: 30,
      paymentFrecuency: 12,
    },
    expectedLength: "error",
  },
  {
    label: "interestRate = null",
    loan: {
      principal: 100000,
      interestRate: null,
      termYears: 30,
      paymentFrecuency: 12,
    },
    expectedLength: "error",
  },
  {
    label: "termYears = undefined",
    loan: {
      principal: 100000,
      interestRate: 0.05,
      termYears: undefined,
      paymentFrecuency: 12,
    },
    expectedLength: "error",
  },
  {
    label: "paymentFrecuency = object",
    loan: {
      principal: 100000,
      interestRate: 0.05,
      termYears: 30,
      paymentFrecuency: {},
    },
    expectedLength: "error",
  },
];


for (const {label, loan, expectedLength} of testCases) {
  assertScheduleStructure(label, loan, expectedLength);
}
 */
//-------
/* function assertInterestSaving(label, loan, earlyRepaymentPeriod, expectedValue) {
  try {
    const schedule = generateAmortizationSchedule(loan);
    const result = calculateInterestSaving(schedule, earlyRepaymentPeriod);
    const match = result === expectedValue;
    if (match) {
      console.log(`✅ ${label} → interest saved: ${result}`);
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


const baseLoan = {
  principal: 100000,
  interestRate: 0.05,
  termYears: 30,
  paymentFrecuency: 12
};
const testCases = [
  { label: "early repayment at period 1", loan: baseLoan, earlyRepaymentPeriod: 1, expectedValue: "92839.12" },
  { label: "early repayment at period 60", loan: baseLoan, earlyRepaymentPeriod: 60, expectedValue: "69217.75" },
  { label: "early repayment at period 180", loan: baseLoan, earlyRepaymentPeriod: 180, expectedValue: "28743.98" },
  { label: "early repayment at period 359", loan: baseLoan, earlyRepaymentPeriod: 359, expectedValue: "2.23" },
  { label: "early repayment at period 360", loan: baseLoan, earlyRepaymentPeriod: 360, expectedValue: "0.00" },
  { label: "early repayment beyond schedule", loan: baseLoan, earlyRepaymentPeriod: 400, expectedValue: "0.00" },
  { label: "early repayment at negative period", loan: baseLoan, earlyRepaymentPeriod: -1, expectedValue: "error" },
  { label: "early repayment at null", loan: baseLoan, earlyRepaymentPeriod: null, expectedValue: "error" },
  { label: "early repayment at undefined", loan: baseLoan, earlyRepaymentPeriod: undefined, expectedValue: "error" },
  { label: "early repayment at string '100'", loan: baseLoan, earlyRepaymentPeriod: "100", expectedValue: "54441.62" }
];

for (const {label, loan, earlyRepaymentPeriod, expectedValue} of testCases) {
  assertInterestSaving(label, loan, earlyRepaymentPeriod, expectedValue);
}
 */
//-------
function assertEarlyRepayment(label, loan, earlyRepaymentPeriod, expectedLength) {
  const fullSchedule = generateAmortizationSchedule(loan);
  const modifiedSchedule = applyEarlyRepayment(loan, fullSchedule, earlyRepaymentPeriod);

  const finalPeriod = modifiedSchedule[earlyRepaymentPeriod - 1];
  const originalBalance = fullSchedule[earlyRepaymentPeriod - 1].balance;

  const isLengthCorrect = modifiedSchedule.length === earlyRepaymentPeriod;
  const isFinalPaymentCorrect = finalPeriod.payment === originalBalance;
  const isPrincipalCorrect = finalPeriod.principal === originalBalance;
  const isInterestZero = finalPeriod.interest === 0;
  const isBalanceZero = finalPeriod.balance === 0;

  const allPass = isLengthCorrect && isFinalPaymentCorrect && isPrincipalCorrect && isInterestZero && isBalanceZero;

  if (allPass) {
    console.log(`✅ ${label} → schedule length: ${modifiedSchedule.length}, final payment: ${finalPeriod.payment.toFixed(2)}`);
  } else {
    console.error(`❌ ${label}`);
    if (!isLengthCorrect) console.error(`  ✘ Expected length ${earlyRepaymentPeriod}, got ${modifiedSchedule.length}`);
    if (!isFinalPaymentCorrect) console.error(`  ✘ Final payment mismatch: expected ${originalBalance}, got ${finalPeriod.payment}`);
    if (!isPrincipalCorrect) console.error(`  ✘ Principal mismatch: expected ${originalBalance}, got ${finalPeriod.principal}`);
    if (!isInterestZero) console.error(`  ✘ Interest should be 0, got ${finalPeriod.interest}`);
    if (!isBalanceZero) console.error(`  ✘ Balance should be 0, got ${finalPeriod.balance}`);
  }
}

const baseLoan = {
  principal: 100000,
  interestRate: 0.05,
  termYears: 30,
  paymentFrecuency: 12
};

const testCases = [
  { label: "repayment at period 1", earlyRepaymentPeriod: 1 },
  { label: "repayment at period 60", earlyRepaymentPeriod: 60 },
  { label: "repayment at period 180", earlyRepaymentPeriod: 180 },
  { label: "repayment at period 359", earlyRepaymentPeriod: 359 },
  { label: "repayment at period 360", earlyRepaymentPeriod: 360 }
];

for (const { label, earlyRepaymentPeriod } of testCases) {
  assertEarlyRepayment(label, baseLoan, earlyRepaymentPeriod, earlyRepaymentPeriod);
}
