export const TokenErrors = {
  MISSING_TOKEN: {
    code: "MISSING_TOKEN",
    message: "Missing token",
    status: 401,
  },
  INVALID_HEADER: {
    code: "INVALID_TOKEN",
    message: "Invalid token",
    status: 401,
  },
  INVALID_PAYLOAD: {
    code: "INVALID_TOKEN",
    message: "Invalid token",
    status: 401,
  },
  INVALID_SIGNATURE: {
    code: "INVALID_TOKEN_SIGNATURE",
    message: "Invalid token",
    status: 401,
  },
  EXPIRED_TOKEN: {
    code: "TOKEN_EXPIRED",
    message: "Invalid token",
    status: 401,
  },
  INVALID_TOKEN: {
    code: "INVALID_TOKEN",
    message: "Invalid token",
    status: 401,
  },
  TOKEN_GEN_ERROR: {
    code: "TOKEN_GEN_ERROR",
    message: "Failed to generate the token",
    status: 500,
  },
};
