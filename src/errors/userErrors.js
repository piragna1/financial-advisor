export const UserErrors = {
  CREATE: {
    INVALID_INPUT: {
      code: "USER_CREATE_INVALID_INPUT",
      message: "Invalid user input",
      status: 400,
    },
    INVALID_ID: {
      code: "USER_CREATE_INVALID_ID",
      message: "Invalid user ID",
      status: 400,
    },
    DUPLICATE_EMAIL: {
      code: "USER_CREATE_DUPLICATE_EMAIL",
      message: "Email already in use",
      status: 409,
    },
    FAILED_CREATION: {
      code: "USER_CREATE_FAILED",
      message: "User creation failed",
      status: 500,
    },
  },

  READ: {
    INVALID_ID: {
      code: "USER_READ_INVALID_ID",
      message: "Invalid user ID",
      status: 400,
    },
    NOT_FOUND: {
      code: "USER_READ_NOT_FOUND",
      message: "User not found",
      status: 404,
    },
  },

  UPDATE: {
    INVALID_INPUT: {
      code: "USER_UPDATE_INVALID_INPUT",
      message: "Invalid user update input",
      status: 400,
    },
    INVALID_ID: {
      code: "USER_UPDATE_INVALID_ID",
      message: "Invalid user ID",
      status: 400,
    },
    DUPLICATE_EMAIL: {
      code: "USER_UPDATE_DUPLICATE_EMAIL",
      message: "Email already in use",
      status: 409,
    },
    NOT_FOUND: {
      code: "USER_UPDATE_NOT_FOUND",
      message: "User not found",
      status: 404,
    },
    FAILED_UPDATE: {
      code: "USER_UPDATE_FAILED",
      message: "User update failed",
      status: 500,
    },
  },

  DELETE: {
    INVALID_ID: {
      code: "USER_DELETE_INVALID_ID",
      message: "Invalid user ID",
      status: 400,
    },
    NOT_FOUND: {
      code: "USER_DELETE_NOT_FOUND",
      message: "User not found",
      status: 404,
    },
    FAILED_DELETE: {
      code: "USER_DELETE_FAILED",
      message: "User deletion failed",
      status: 500,
    },
  },
};
