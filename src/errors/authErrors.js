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
      code: "REGISTER_USER_ALREADY_EXISTS",
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
/* 
const expectedKeys = ["code", "message", "status"];
const validStatusCodes = new Set([400, 401, 402, 403, 404, 409, 422, 500]);

const seenCodes = new Set();
const seenMessages = new Set();

function validateErrorObject(domain, key, errorObj) {
  console.log(`🔍 Testing AuthErrors.${domain}.${key}`);

  // ✅ Structural integrity
  for (const field of expectedKeys) {
    if (!(field in errorObj)) {
      console.error(`❌ Missing field "${field}" in ${domain}.${key}`);
    }
  }

  // ✅ Type checks
  if (typeof errorObj.code !== "string") {
    console.error(`❌ code must be a string in ${domain}.${key}`);
  }

  if (typeof errorObj.message !== "string") {
    console.error(`❌ message must be a string in ${domain}.${key}`);
  }

  if (typeof errorObj.status !== "number") {
    console.error(`❌ status must be a number in ${domain}.${key}`);
  }

  // ✅ Value checks
  if (!errorObj.code || errorObj.code.trim() === "") {
    console.error(`❌ code is empty or whitespace in ${domain}.${key}`);
  }

  if (!errorObj.message || errorObj.message.trim() === "") {
    console.error(`❌ message is empty or whitespace in ${domain}.${key}`);
  }

  if (!validStatusCodes.has(errorObj.status)) {
    console.error(`❌ status ${errorObj.status} is not valid in ${domain}.${key}`);
  }

  // ✅ Semantic alignment
  const prefix = domain.toUpperCase();
  if (!errorObj.code.startsWith(prefix) && !errorObj.code.startsWith(key)) {
    console.warn(`⚠️ code "${errorObj.code}" may not match domain/key prefix "${prefix}"`);
  }

  // ✅ Uniqueness checks
  if (seenCodes.has(errorObj.code)) {
    console.error(`❌ Duplicate code "${errorObj.code}" found in ${domain}.${key}`);
  } else {
    seenCodes.add(errorObj.code);
  }

  // ✅ Extra field detection
  const extraFields = Object.keys(errorObj).filter((k) => !expectedKeys.includes(k));
  if (extraFields.length > 0) {
    console.warn(`⚠️ Extra fields in ${domain}.${key}: ${extraFields.join(", ")}`);
  }

  // ✅ Deep freeze test (immutability)
  try {
    errorObj.code = "MUTATED";
    if (errorObj.code === "MUTATED") {
      console.error(`❌ ${domain}.${key} is mutable after freeze`);
    }
  } catch (e) {
    console.log(`✅ ${domain}.${key} resisted mutation`);
  }

  console.log("✅ Passed\n");
}

// 🧪 Runner
function runAuthErrorTests(AuthErrors) {
  for (const [domain, errorGroup] of Object.entries(AuthErrors)) {
    for (const [key, errorObj] of Object.entries(errorGroup)) {
      validateErrorObject(domain, key, errorObj);
    }
  }
}

runAuthErrorTests(AuthErrors);
 */