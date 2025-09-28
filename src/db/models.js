const User = {
  id: String,           
  email: String,          
  passwordHash: String,    
  createdAt: Date,         
  updatedAt:Date
};


export const profile = {
  id:String,
  userId: String,              
  firstName: String,
  lastName: String,
  birthDate: Date || undefined,
  location: String || undefined,
  language: String || 'en',
  avatarUrl: String || undefined,
  bio: String,
}

export const financialProfile = {
    id:String,
    userId:String,
    salary:Number,
    createdAt:Date,
    updatedAt:Date
};

export const loan = {
    id:String,
    financialProfileId:String,
    startDate: Date,
    termYears:Number,
    principal:Number,
    interestRate:Number,
    paymentFrecuencyPerYear: Number,
    compoundingFrequencyPerYear:Number,
    gracePeriodMonths:Number,
    balloonPayment:Number,
    loanType:String,
    currency:String,
    savedAt:Date
};

export const schedule = {
    id:String,
    loanId:String,
    plan: 'weekly'|'monthly'|'custom',
    startDate:Date,
    totalAmount:Number,
    currency:String,
    installments:Number,
    createdAt:Date,
    updatedAt:Date
}

export const payment = {
    id:String,
    scheduleId:String,
    dueDate:Date,
    amount:Number,
    currency:String,
    status:'pending' | 'paid' | 'failed',
    paidAt:Date,
    method:'credit-card'|'bank-transfer'|'cash',
    reference:String,
    notes:String
}

/*
Relationships
User - x
User - Profile -> (1:1) An user has a profile while the profile belongs to that user.

User - FinancialProfile -> (1:1) An user has a financial profile while that financial profile belongs to the user.

Profile - x
Profile - User -> (1:1) The profile belongs to the user while the user owns that profile.

FinancialProfile - x
FinancialProfile - User -> (1:1) The financial profile belongs to the user that owns that profile.

FinancialProfile - Loan -> (1:N) A financial profile can simulate 0 or many loans while any loan belongs to that profile.

Loan - x
Loan - FinancialProfile -> (1:1) A loan belongs to a financial profile.

Loan - Schedule -> (1:1) A loan has its own payments schedule.

Schedule - x
Schedule - Loan -> (1:1) A payments schedule belongs to a specific loan.

Schedule - Payment -> (1:N) A schedule may consists of 1 or more payments.

Payment - x
Payment - Schedule -> (1:1) A payment belongs to a specific loan schedule.
*/