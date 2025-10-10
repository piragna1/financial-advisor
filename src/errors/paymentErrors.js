export const PaymentErrors = {
  CREATE: {
    INVALID_ID: {
      code: "PAYMENT_CREATE_INVALID_ID",
      message: "Invalid or missing payment ID",
      status: 400,
    },
    INVALID_DATA: {
      code: "PAYMENT_CREATE_INVALID_DATA",
      message: "Missing or invalid payment data",
      status: 400,
    },
    INVALID_REFERENCE:{
      code:"CREATE_INVALID_REFERENCE",
      message: 'Missing or invalid payment reference for creation',
      status:400
    },
    INVALID_NOTES:{
      code:"CREATE_INVALID_NOTES",
      message: 'Missing or invalid payment notes for creation',
      status:400
    },
    INVALID_PAIDAT:{
      code:"CREATE_INVALID_PAIDAT",
      message: 'Invalid paidAt value',
      status:400
    }
  },
  READ: {
    INVALID_ID: {
      code: "PAYMENT_READ_INVALID_ID",
      message: "Invalid or missing payment ID",
      status: 400,
    },
    NOT_FOUND: {
      code: "PAYMENT_READ_NOT_FOUND",
      message: "Payment not found",
      status: 404,
    },
  },
  UPDATE: {
    INVALID_ID: {
      code: "PAYMENT_UPDATE_INVALID_ID",
      message: "Invalid or missing payment ID",
      status: 400,
    },
    NOT_FOUND: {
      code: "PAYMENT_UPDATE_NOT_FOUND",
      message: "Payment not found",
      status: 404,
    },
    INVALID_DATA: {
      code: "UPDATE_INVALID_DATA",
      message: "Missing or invalid payment data for update",
      status: 400,
    },
    INVALID_REFERENCE:{
      code:"UPDATE_INVALID_REFERENCE",
      message: 'Missing or invalid payment reference for update',
      status:400
    },
    INVALID_NOTES:{
      code:"UPDATE_INVALID_NOTES",
      message: 'Missing or invalid payment notes for update',
      status:400
    },
    INVALID_PAIDAT:{
      code:"UPDATE_INVALID_PAIDAT",
      message: 'Invalid paidAt value',
      status:400
    }
  },
  DELETE: {
    INVALID_ID: {
      code: "PAYMENT_DELETE_INVALID_ID",
      message: "Invalid or missing payment ID",
      status: 400,
    },
    NOT_FOUND: {
      code: "PAYMENT_DELETE_NOT_FOUND",
      message: "Payment not found",
      status: 404,
    },
  },
  AMOUNT: {
    NOT_A_NUMBER:{
      code:'AMOUNT_NOT_A_NUMBER',
      message: 'The amount is not a valid number',
      status:404
    },
    LESS_THAN_ZERO:{
      code:"AMOUNT_LESS_THAN_ZERO",
      message:"The amount of the payment is less than zero",
      status:405
    },
  },
  CURRENCY:{
    INVALID:{
      code:"CURRENCY_INVALID",
      message:'The currency entered is not valid',
      status:406
    }
  },
  DUE_DATE:{
    INVALID:{
      code:'DUE_DATE_INVALID',
      message:'The due date indicated is not valid',
      status:407
    }
  },
  NOTES:{
    NOT_A_STRING:{
      code:'NOTES_NOT_A_STRING',
      message:'Notes received are not valid',
      status:408
    },
    CAPACITY_EXCEEDED:{
      code:'NOTES_CAPACITY_EXCEEDED',
      message:'Notes have exceeded the maximum capacity of characters',
      status:409
    },
  },
  PAID_AT:{
    INVALID:{
      code:'PAID_AT_INVALID',
      message: 'Paid at value is not valid',
      status:410
    }
  },
  STATUS:{
    INVALID:{
      code:'STATUS_INVALID',
      message:'The status is not valid',
      status:411
    }
  }
};
