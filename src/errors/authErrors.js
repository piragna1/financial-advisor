export const AuthErrors = {
  LOGIN: {
    INVALID_CREDENTIALS: {
      code: "LOGIN_INVALID_CREDENTIALS",
      message: "Invalid email or password",
      status: 401,
    },
    USER_NOT_FOUND: {
      code: "LOGIN_USER_NOT_FOUND",
      message: "User not found",
      status: 404,
    },
  },
  REGISTER: {
    INVALID_INPUT: {
      code: "REGISTER_INVALID_INPUT",
      message: "Invalid field/s format",
      status: 400,
    },
    MISSING_CREDENTIALS: {
      code: "REGISTER_MISSING_CREDENTIALS",
      message: "There is one (or more) field(s) missing",
      status: 402,
    },
    USER_EXISTS: {
      code: "REGISTER_USER_EXISTS",
      message: "User is currently not available",
      status: 409,
    },
    CREATION_FAILED: {
      code: "REGISTER_CREATION_FAILED",
      message: "An error has occurred during registration",
      status: 500,
    },
  },
  TOKEN: {
    MISSING_TOKEN: {
      code: "TOKEN_MISSING",
      message: "Missing token",
      status: 401,
    },
    EXPIRED_TOKEN: {
      code: "TOKEN_EXPIRED",
      message: "The token has expired",
      status: 401,
    },
    INVALID_TOKEN: {
      code: "TOKEN_INVALID",
      message: "Invalid token",
      status: 401,
    },
    INVALID_HEADER: {
      code: "TOKEN_INVALID_HEADER",
      message: "Invalid token header",
      status: 401,
    },
    INVALID_PAYLOAD: {
      code: "TOKEN_INVALID_PAYLOAD",
      message: "Invalid token payload",
      status: 401,
    },
    INVALID_SIGNATURE: {
      code: "TOKEN_INVALID_SIGNATURE",
      message: "Invalid token signature",
      status: 401,
    },
    TOKEN_GEN_ERROR: {
      code: "TOKEN_GEN_ERROR",
      message: "Unexpected error. Failed to generate the token",
      status: 500,
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

deepFreeze(AuthErrors);