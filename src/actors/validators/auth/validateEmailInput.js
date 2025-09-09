import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";

export function validateEmailInput(email) {
  if (!email) {
    throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Email is required');
  } else {
    if (email && typeof email !== "string") {
      throw new AppError(AuthErrors.INVALID_INPUT, 'Email cannot be a number')
    } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      throw new AppError(AuthErrors.INVALID_INPUT, 'Invalid email format')
    }
  }
  return true;
}


const testCases = [
  {
    label: "✅ Valid email",
    input: "gonzalo@example.com",
    expectError: false
  },
  {
    label: "❌ Missing email (undefined)",
    input: undefined,
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Missing email (null)",
    input: null,
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Empty string",
    input: "",
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Email not a string (number)",
    input: 12345,
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Email not a string (object)",
    input: { email: "gonzalo@example.com" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Invalid format (missing domain)",
    input: "gonzalo@",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Invalid format (missing @)",
    input: "gonzalo.example.com",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Invalid format (spaces)",
    input: "gonzalo @example.com",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Invalid format (trailing dot)",
    input: "gonzalo@example.",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  }
];

for (const { label, input, expectError, expectedCode } of testCases) {
  console.log(`\n${label}`);
  try {
    const result = validateEmailInput(input);
    console.log("Result:", result);
  } catch (error) {
    if (expectError) {
      console.log("Caught AppError:", error);
      if (expectedCode && error.code !== expectedCode) {
        console.error(`❌ Expected code ${expectedCode}, got ${error.code}`);
      }
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
}
