import { validateEmailInput } from "./validateEmailInput.js";
import { validatePasswordInput } from "./validatePasswordInput.js";

//validateLoginInput.js
export function validateLoginInput(input) {
  const { email, password } = input;
  const emailErrors = validateEmailInput(email);
  const passwordErrors = validatePasswordInput(password);
  return true;
}

const testCases = [
  {
    label: "✅ Valid login input",
    input: { email: "gonzalo@example.com", password: "securePass123" },
    expectError: false
  },
  {
    label: "❌ Missing input object (undefined)",
    input: undefined,
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Missing input object (null)",
    input: null,
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Input is not an object (string)",
    input: "notAnObject",
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Missing email field",
    input: { password: "securePass123" },
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Missing password field",
    input: { email: "gonzalo@example.com" },
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Empty email and password",
    input: { email: "", password: "" },
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Invalid email format",
    input: { email: "gonzalo@", password: "securePass123" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Email is not a string",
    input: { email: 12345, password: "securePass123" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Password too short",
    input: { email: "gonzalo@example.com", password: "abc" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Password too long",
    input: { email: "gonzalo@example.com", password: "a".repeat(201) },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Password is not a string",
    input: { email: "gonzalo@example.com", password: 123456 },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Email contains control characters",
    input: { email: "gonza\nlo@example.com", password: "securePass123" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Password contains emoji",
    input: { email: "gonzalo@example.com", password: "🔥🔥🔥" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Both fields invalid",
    input: { email: "invalid@", password: "abc" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  }
];

for (const { label, input, expectError, expectedCode } of testCases) {
  console.log(`\n${label}`);
  try {
    const result = validateLoginInput(input);
    console.log("Result:", result);
  } catch (error) {
    if (expectError) {
      console.log("Caught AppError:", error.code);
      if (expectedCode && error.code !== expectedCode) {
        console.error(`❌ Expected code ${expectedCode}, but got ${error.code}`);
      }
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
}
