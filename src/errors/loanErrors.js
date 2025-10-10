export const LoanErrors = {
  VALIDATION: {
    INVALID_STRUCTURE: {
      code: "VALIDATION_INVALID_STRUCTURE",
      message: "Invalid loan structure received",
      status: 400,
    },
    INVALID_LOAN_ID: {
      code: "VALIDATION_INVALID_LOAN_ID",
      message: "Invalid loan id",
      status: 400,
    },
    INVALID_FINANCIAL_PROFILE_ID: {
      code: "VALIDATION_INVALID_FINANCIAL_PROFILE_ID",
      message: "Invalid financial profile id",
      status: 400,
    },
    INVALID_START_DATE: {
      code: "VALIDATION_INVALID_START_DATE",
      message: "Invalid start date value received",
      status: 400,
    },
    INVALID_TERM_YEARS: {
      code: "VALIDATION_INVALID_TERM_YEARS",
      message: "Invalid term years value received",
      status: 400,
    },
    INVALID_PRINCIPAL: {
      code: "VALIDATION_INVALID_PRINCIPAL",
      message: "Invalid principal received",
      status: 400,
    },
    INVALID_INTEREST_RATE: {
      code: "VALIDATION_INVALID_INTEREST_RATE",
      message: "Invalid loan's interest rate value received",
      status: 400,
    },
    INVALID_PAYMENT_FREQUENCY: {
      code: "VALIDATION_INVALID_PAYMENT_FREQUENCY",
      message: "Invalid payment frequency per year received",
      status: 400,
    },
    INVALID_COMPOUNDING_FREQUENCY: {
      code: "VALIDATION_INVALID_COMPOUNDING_FREQUENCY",
      message: "Invalid compounding frequency per year received",
      status: 400,
    },
    INVALID_GRACE_PERIOD: {
      code: "VALIDATION_INVALID_GRACE_PERIOD",
      message: "Invalid grace periods' value received",
      status: 400,
    },
    INVALID_BALLOON_PAYMENT: {
      code: "VALIDATION_INVALID_BALLOON_PAYMENT",
      message: "Invalid balloon payment's value received",
      status: 400,
    },
    INVALID_LOAN_TYPE: {
      code: "VALIDATION_INVALID_LOAN_TYPE",
      message: "Invalid loan type received",
      status: 400,
    },
    INVALID_CURRENCY: {
      code: "VALIDATION_INVALID_CURRENCY",
      message: "Invalid currency received",
      status: 400,
    },
  },
  SIMULATION: {
    FAILED_CALCULATION: {
      code: "SIMULATION_FAILED_CALCULATION",
      message: "Loan simulation failed due to invalid parameters",
      status: 422,
    },
    INSUFFICIENT_CAPACITY: {
      code: "SIMULATION_INSUFFICIENT_CAPACITY",
      message: "User's repayment capacity is insufficient for this loan",
      status: 403,
    },
  },
  CREATION: {
    FAILED_CREATION: {
      code: "CREATION_FAILED",
      message: "An error occurred while creating the loan",
      status: 500,
    },
    DUPLICATE_LOAN: {
      code: "CREATION_DUPLICATE_LOAN",
      message: "A loan with this ID already exists",
      status: 409,
    },
    MISSING_FINANCIAL_PROFILE_ID:{
      code:"CREATION_MISSING_FINANCIAL_PROFILE_ID",
      message:"Financial profile id is missing",
      status:410
    },
    MISSING_LOAN_ID:{
      code:"CREATION_MISSING_LOAN_ID",
      message:"Loan id is missing",
      status:411
    }
  },
  FIND: {
    NOT_FOUND: {
      code: "FIND_LOAN_NOT_FOUND",
      message: "Loan not found",
      status: 404,
    },
  },
  DELETE: {
  NOT_FOUND: {
    code: "DELETE_LOAN_NOT_FOUND",
    message: "Loan not found or already deleted",
    status: 404,
  },
  FAILED: {
    code: "DELETE_LOAN_FAILED",
    message: "An error occurred while deleting the loan",
    status: 500,
  },
},UPDATE:{
    MISSING_DATA:{
      code: "UPDATE_MISSING_DATA",
      message: "No data received for updating the loan",
      status:412
    },
    INVALID_LOAN_ID:{
      code:"UPDATE_INVALID_LOAN_ID",
      message: "The id received is not valid",
      status:413
    },
  },
  BALLOON_PAYMENT:{
    MISSING:{
      code:"BALLOON_PAYMENT_MISSING",
      message:"Balloon payment is missing",
      status:414
    },
    NEGATIVE:{
      code:"BALLON_PAYMENT_NEGATIVE",
      message:"Balloon payment must be a positive number",
      status:415
    },
    NOT_A_NUMBER:{
      code:"BALLON_PAYMENT_NOT_A_NUMBER",
      message:"Balloon payment must be a number",
      status:416
    }
  },
  COMPOUNDING_FREQUENCY_PER_YEAR: {
    MISSING: {
      code: "COMPOUNDING_FREQUENCY_PER_YEAR_MISSING",
      message: "Compounding frequency per year is missing",
      status: 414
    },
    NEGATIVE: {
      code: "COMPOUNDING_FREQUENCY_PER_YEAR_NEGATIVE",
      message: "Compounding frequency per year must be a positive number",
      status: 415
    },
    NOT_A_NUMBER: {
      code: "COMPOUNDING_FREQUENCY_PER_YEAR_NOT_A_NUMBER",
      message: "Compounding frequency per year must be a number",
      status: 416
    }
  }
};


function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach((val) => {
    if (typeof val === "object" && val !== null && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  });
}

deepFreeze(LoanErrors);
