export const AuthErrors = {
  LOGIN: {
    INVALID_CREDENTIALS: {
      code: "INVALID_CREDENTIALS",
      message: "Invalid email or password",
      status: 401,
    },
    USER_NOT_FOUND: {
      code: "USER_NOT_FOUND",
      message: "User not found",
      status: 404,
    },
  },
  REGISTER: {
    INVALID_INPUT: {
      code: "INVALID_INPUT",
      message: "Invalid field/s format",
      status: 400,
    },
    MISSING_CREDENTIALS: {
      code: "MISSING_CREDENTIALS",
      message: "There is one (or more) field(s) missing",
      status: 402,
    },
    USER_EXISTS: {
      code: "USER_ALREADY_EXISTS",
      message: "User is currently not available",
      status: 409,
    },
    CREATION_FAILED: {
      code: "CREATION_FAILED",
      message: "An error has ocurred during registration",
      status: 500,
    },
  },
  TOKEN: {
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
  },
};

// const expectedKeys = ["code", "message", "status"];
// const validStatusCodes = new Set([400, 401, 402, 403, 404, 409, 422, 500]);

// const seenCodes = new Set();
// const seenMessages = new Set();

// for (const [key, errorObj] of Object.entries(AuthErrors)) {
//   console.log(`🔍 Testing AuthErrors.${key}`);

//   // ✅ Structural integrity
//   for (const field of expectedKeys) {
//     if (!(field in errorObj)) {
//       console.error(`❌ Missing field "${field}" in ${key}`);
//     }
//   }

//   // ✅ Type checks
//   if (typeof errorObj.code !== "string") {
//     console.error(`❌ code must be a string in ${key}`);
//   }

//   if (typeof errorObj.message !== "string") {
//     console.error(`❌ message must be a string in ${key}`);
//   }

//   if (typeof errorObj.status !== "number") {
//     console.error(`❌ status must be a number in ${key}`);
//   }

//   // ✅ Value checks
//   if (!errorObj.code || errorObj.code.trim() === "") {
//     console.error(`❌ code is empty or whitespace in ${key}`);
//   }

//   if (!errorObj.message || errorObj.message.trim() === "") {
//     console.error(`❌ message is empty or whitespace in ${key}`);
//   }

//   if (!validStatusCodes.has(errorObj.status)) {
//     console.error(
//       `❌ status ${errorObj.status} is not a valid HTTP code in ${key}`
//     );
//   }

//   // ✅ Semantic alignment
//   const prefix = key.split("_")[0];
//   if (!errorObj.code.startsWith(prefix)) {
//     console.warn(
//       `⚠️ code "${errorObj.code}" may not match key prefix "${prefix}"`
//     );
//   }

//   if (errorObj.message.length < 10) {
//     console.warn(`⚠️ message in ${key} may be too short or vague`);
//   }

//   // ✅ Uniqueness checks
//   if (seenCodes.has(errorObj.code)) {
//     console.error(`❌ Duplicate code "${errorObj.code}" found in ${key}`);
//   } else {
//     seenCodes.add(errorObj.code);
//   }

//   if (seenMessages.has(errorObj.message)) {
//     console.warn(`⚠️ Duplicate message "${errorObj.message}" found in ${key}`);
//   } else {
//     seenMessages.add(errorObj.message);
//   }

//   // ✅ Extra field detection
//   const extraFields = Object.keys(errorObj).filter(
//     (k) => !expectedKeys.includes(k)
//   );
//   if (extraFields.length > 0) {
//     console.warn(`⚠️ Extra fields in ${key}: ${extraFields.join(", ")}`);
//   }

//   // ✅ Deep freeze test (immutability)
//   try {
//     Object.freeze(errorObj);
//     errorObj.code = "MUTATED";
//     if (errorObj.code === "MUTATED") {
//       console.error(`❌ ${key} is mutable after freeze`);
//     }
//   } catch (e) {
//     console.log(`✅ ${key} resisted mutation`);
//   }

//   console.log("✅ Passed\n");
// }
