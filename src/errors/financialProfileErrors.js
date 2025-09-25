export const FinancialErrors = {
  CREATE: {
    INVALID_INPUT: {
      code: "FINANCIAL_CREATE_INVALID_INPUT",
      message: "Profile must be a valid object",
      status: 400
    },
    INVALID_ID: {
      code: "FINANCIAL_CREATE_INVALID_ID",
      message: "Missing or invalid profile ID",
      status: 400
    },
    INVALID_USER_ID: {
      code: "FINANCIAL_CREATE_INVALID_USER_ID",
      message: "Missing or invalid user ID",
      status: 400
    },
    INVALID_SALARY: {
      code: "FINANCIAL_CREATE_INVALID_SALARY",
      message: "Salary must be a non-negative number",
      status: 422
    },
    CREATION_FAILED: {
      code: "FINANCIAL_CREATE_FAILED",
      message: "An error occurred while creating the financial profile",
      status: 500
    }
  },
  READ: {
    INVALID_ID: {
      code: "FINANCIAL_READ_INVALID_ID",
      message: "Missing or invalid profile ID",
      status: 400
    },
    NOT_FOUND: {
      code: "FINANCIAL_READ_NOT_FOUND",
      message: "Financial profile not found",
      status: 404
    }
  },
  UPDATE: {
    INVALID_INPUT: {
      code: "FINANCIAL_UPDATE_INVALID_INPUT",
      message: "Update payload must be a valid object",
      status: 400
    },
    INVALID_ID: {
      code: "FINANCIAL_UPDATE_INVALID_ID",
      message: "Missing or invalid profile ID",
      status: 400
    },
    NO_VALID_FIELDS: {
      code: "FINANCIAL_UPDATE_NO_VALID_FIELDS",
      message: "No valid fields to update",
      status: 422
    },
    NOT_FOUND: {
      code: "FINANCIAL_UPDATE_NOT_FOUND",
      message: "Financial profile not found",
      status: 404
    }
  },
  DELETE: {
    INVALID_ID: {
      code: "FINANCIAL_DELETE_INVALID_ID",
      message: "Missing or invalid profile ID",
      status: 400
    },
    NOT_FOUND: {
      code: "FINANCIAL_DELETE_NOT_FOUND",
      message: "Financial profile not found",
      status: 404
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

deepFreeze(FinancialErrors);
