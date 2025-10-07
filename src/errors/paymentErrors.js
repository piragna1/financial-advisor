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
};
