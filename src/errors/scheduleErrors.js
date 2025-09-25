export const ScheduleErrors = {
  CREATE: {
    INVALID_INPUT: {
      code: "SCHEDULE_CREATE_INVALID_INPUT",
      message: "Invalid schedule input",
      status: 400,
    },
    INVALID_ID: {
      code: "SCHEDULE_CREATE_INVALID_ID",
      message: "Invalid schedule ID",
      status: 400,
    },
    INVALID_LOAN_ID: {
      code: "SCHEDULE_CREATE_INVALID_LOAN_ID",
      message: "Invalid loan ID",
      status: 400,
    },
    INVALID_PLAN: {
      code: "SCHEDULE_CREATE_INVALID_PLAN",
      message: "Unsupported plan value",
      status: 422,
    },
    INVALID_START_DATE: {
      code: "SCHEDULE_CREATE_INVALID_START_DATE",
      message: "Invalid start date format",
      status: 400,
    },
    INVALID_TOTAL_AMOUNT: {
      code: "SCHEDULE_CREATE_INVALID_TOTAL_AMOUNT",
      message: "Total amount must be a positive number",
      status: 400,
    },
    INVALID_CURRENCY: {
      code: "SCHEDULE_CREATE_INVALID_CURRENCY",
      message: "Invalid currency format",
      status: 400,
    },
    INVALID_INSTALLMENTS: {
      code: "SCHEDULE_CREATE_INVALID_INSTALLMENTS",
      message: "Installments must be a positive integer",
      status: 400,
    },
  },

  READ: {
    INVALID_ID: {
      code: "SCHEDULE_READ_INVALID_ID",
      message: "Invalid schedule ID",
      status: 400,
    },
    NOT_FOUND: {
      code: "SCHEDULE_READ_NOT_FOUND",
      message: "Schedule not found",
      status: 404,
    },
  },

  UPDATE: {
    INVALID_INPUT: {
      code: "SCHEDULE_UPDATE_INVALID_INPUT",
      message: "Invalid schedule update input",
      status: 400,
    },
    INVALID_ID: {
      code: "SCHEDULE_UPDATE_INVALID_ID",
      message: "Invalid schedule ID",
      status: 400,
    },
    INVALID_PLAN: {
      code: "SCHEDULE_UPDATE_INVALID_PLAN",
      message: "Unsupported plan value",
      status: 422,
    },
    INVALID_START_DATE: {
      code: "SCHEDULE_UPDATE_INVALID_START_DATE",
      message: "Invalid start date format",
      status: 400,
    },
    INVALID_TOTAL_AMOUNT: {
      code: "SCHEDULE_UPDATE_INVALID_TOTAL_AMOUNT",
      message: "Total amount must be a positive number",
      status: 400,
    },
    INVALID_CURRENCY: {
      code: "SCHEDULE_UPDATE_INVALID_CURRENCY",
      message: "Invalid currency format",
      status: 400,
    },
    INVALID_INSTALLMENTS: {
      code: "SCHEDULE_UPDATE_INVALID_INSTALLMENTS",
      message: "Installments must be a positive integer",
      status: 400,
    },
    NOT_FOUND: {
      code: "SCHEDULE_UPDATE_NOT_FOUND",
      message: "Schedule not found",
      status: 404,
    },
  },

  DELETE: {
    INVALID_ID: {
      code: "SCHEDULE_DELETE_INVALID_ID",
      message: "Invalid schedule ID",
      status: 400,
    },
    NOT_FOUND: {
      code: "SCHEDULE_DELETE_NOT_FOUND",
      message: "Schedule not found",
      status: 404,
    },
  },
};



function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach((val) => {
    if (typeof val === "object" && val !== null && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  });
}

deepFreeze(ScheduleErrors);
