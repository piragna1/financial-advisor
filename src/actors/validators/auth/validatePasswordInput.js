import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";
import {hasEmoji} from "../../utils/hasEmoji.js"
import { hasWhiteSpaces } from "../../utils/hasWhiteSpaces.js";
import {hasControlChars} from '../../utils/hasControlChars.js'

export function validatePasswordInput(password){
    if (!password){ 
        throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Password is missing');
    }
    else {
      if (hasWhiteSpaces(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'Password can not have white spaces')
      else{
          if (typeof password !== "string") {
              throw new AppError(AuthErrors.INVALID_INPUT, 'Password must be a string');
          }
          else if (password.length <= 3) throw new AppError(AuthErrors.INVALID_INPUT, 'Password must contain more than 3 characters');
          else if (password.length >=200) throw new AppError (AuthErrors.INVALID_INPUT, 'Password must be less than 200 characters');
          else if (hasEmoji(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'The password cannot contain emojis')
          else if (hasControlChars(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'There must not be any control characters in password')
      }
    }
    return true;
}

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
    label: "❌ Password is not a string (number)",
    input: 123456,
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Password is not a string (object)",
    input: { pass: "abc" },
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Too short (length ≤ 3)",
    input: "abc",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Too long (length ≥ 200)",
    input: "a".repeat(200),
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains whitespace (middle)",
    input: "secure pass",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains whitespace (leading)",
    input: " securePass",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains whitespace (trailing)",
    input: "securePass ",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains multiple spaces",
    input: "secure   pass",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains emoji",
    input: "secure🔥Pass",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains multiple emojis",
    input: "💡secure🚀Pass🔥",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains control character (newline)",
    input: "secure\nPass",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains control character (tab)",
    input: "secure\tPass",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains control character (null)",
    input: "secure\u0000Pass",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "✅ Password with symbols (allowed)",
    input: "secure#Pass$123!",
    expectError: false
  },
  {
    label: "✅ Password with accented characters",
    input: "sécuréPáss123",
    expectError: false
  },
  {
    label: "✅ Password with Unicode letters",
    input: "Пароль安全123",
    expectError: false
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
        console.error(`❌ Expected code ${expectedCode}, but got ${error.code}`);
      }
    } else {
      console.error("❌ Unexpected error:", error);
    }
  }
}
