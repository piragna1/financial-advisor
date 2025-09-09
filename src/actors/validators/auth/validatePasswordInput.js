import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";

export function validatePasswordInput(password){
    if (!password){ 
        throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Password is missing');
    }
    else{
        if (typeof password !== "string") {
            throw new AppError(AuthErrors.INVALID_INPUT, 'Password must be a string');
        }
        else if (password.length <= 3) throw new AppError(AuthErrors.INVALID_INPUT, 'Password must contain more than 3 characters');
        else if (password.length >=200) throw new AppError (AuthErrors.INVALID_INPUT, 'Password must be less than 200 characters');
    }
    return true;
}

//generic test cases generated with copilot:

const testCases = [
  {
    label: "✅ Valid password",
    input: "securePass123",
    expectError: false
  },
  {
    label: "❌ Missing password (undefined)",
    input: undefined,
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Missing password (null)",
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
    label: "❌ Not a string (number)",
    input: 123456,
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Not a string (boolean)",
    input: true,
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Too short (length = 3)",
    input: "abc",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Too long (length = 200)",
    input: "a".repeat(200),
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Too long (length = 201)",
    input: "a".repeat(201),
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Array instead of string",
    input: ["abc123"],
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Object instead of string",
    input: { password: "abc123" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Whitespace only",
    input: "   ",
    expectError: false // may pass depending on implementation
  },
  {
    label: "❌ Control characters",
    input: "\n\t",
    expectError: false // may pass depending on implementation
  },
  {
    label: "❌ Emoji characters",
    input: "🔥🔥🔥",
    expectError: false // may pass depending on implementation
  }
];

for (const { label, input, expectError, expectedCode } of testCases) {
  console.log(`\n${label}`);
  try {
    const result = validatePasswordInput(input);
    console.log("Result:", result);
  } catch (error) {
    if (expectError) {
      console.log("Caught AppError:", error.code);
      if (expectedCode && error.code !== expectedCode) {
        console.error(`❌ Expected code ${expectedCode}, got ${error.code}`);
      }
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
}
