import { AppError } from '../../../errors/AppError.js';
import { AuthErrors } from '../../../errors/authErrors.js';
import {isNotSymbol} from '../../utils/isNotSymbol.js'
import {hasEmoji} from '../../utils/hasEmoji.js'
import {hasControlChars} from '../../utils/hasControlChars.js'

export function validateName(name){
    if (!name){
        throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Name is missing')
    }
    else {
        if (name.length < 3 || name.length > 35 ) {
        throw new AppError(AuthErrors.INVALID_INPUT, 'Name is too short (or too long)');
        }
        else if (typeof name === 'number'){
        throw new AppError(AuthErrors.INVALID_INPUT, 'Name must be a string');
        }
        for (const char of name) {
            if (!isNaN(char)) {
                throw new AppError(AuthErrors.INVALID_INPUT, 'Name cannot contain numbers');
            }
            if (!isNotSymbol(char)){
                throw new AppError(AuthErrors.INVALID_INPUT, 'Name cannot contain symbols');
            }
            if (hasEmoji(name)){
                throw new AppError(AuthErrors.INVALID_INPUT, 'Name cannot contain emojis');
            }
            if (hasControlChars(name)){
                throw new AppError(AuthErrors.INVALID_INPUT, 'Name cannot contain control characters');
            }
        }
    }
    return true;
}

const testCases = [
  {
    label: "✅ Valid name",
    input: "Gonzalo",
    expectError: false
  },
  {
    label: "❌ Missing name (undefined)",
    input: undefined,
    expectError: true,
    expectedCode: "MISSING_CREDENTIALS"
  },
  {
    label: "❌ Missing name (null)",
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
    label: "❌ Too short (length < 3)",
    input: "Go",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Too long (length > 35)",
    input: "G".repeat(36),
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Name is a number",
    input: 12345,
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains numbers",
    input: "Gonzalo123",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains symbol (@)",
    input: "Gonz@lo",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains multiple symbols",
    input: "Gonzalo!$%",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains emoji",
    input: "Gonzalo🔥",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains newline character",
    input: "Gonzalo\nVarela",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains tab character",
    input: "Gonzalo\tVarela",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains backspace character",
    input: "Gonzalo\bVarela",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Leading space",
    input: " Gonzalo",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Trailing space",
    input: "Gonzalo ",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains space in the middle",
    input: "Gonzalo Varela",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains hyphen",
    input: "Gonzalo-Varela",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "❌ Contains accent and symbol",
    input: "Gónz@lo",
    expectError: true,
    expectedCode: "INVALID_INPUT"
  },
  {
    label: "✅ Valid name with accent",
    input: "Gónzalo",
    expectError: false
  }
];

for (const { label, input, expectError, expectedCode } of testCases) {
  console.log(`\n${label}`);
  try {
    const result = validateName(input);
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
