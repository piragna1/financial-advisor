import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";
import {hasEmoji} from "../../utils/hasEmoji.js"
import { hasWhiteSpaces } from "../../utils/hasWhiteSpaces.js";
import {hasControlChars} from '../../utils/hasControlChars.js'

export function validatePasswordInput(password){
    //not null
    if (!password){ throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Password is missing');}
    //string type only
    if (typeof password !== 'string') throw new AppError(AuthErrors.INVALID_INPUT, 'Password must be a string');
    //length > 8 && length < 200
    if (password.length <=8 || password.length >= 200) throw new AppError(AuthErrors.INVALID_INPUT, 'Password must have between 8 and 200 characters')
    //no emojis
    if (hasEmoji(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'Input password must NOT have any emoji characters')
    //no white spaces
    if (hasWhiteSpaces(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'White spaces cannot be added to the input password')
    //no control characters
    if (hasControlChars(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'Password CANNOT have any control character!!!')
    return true;
}

// const testCases = [
//   {
//     label: "✅ Valid password",
//     input: "securePass123",
//     expectError: false
//   },
//   {
//     label: "❌ Missing password (undefined)",
//     input: undefined,
//     expectError: true,
//     expectedCode: "MISSING_CREDENTIALS"
//   },
//   {
//     label: "❌ Missing password (null)",
//     input: null,
//     expectError: true,
//     expectedCode: "MISSING_CREDENTIALS"
//   },
//   {
//     label: "❌ Empty string",
//     input: "",
//     expectError: true,
//     expectedCode: "MISSING_CREDENTIALS"
//   },
//   {
//     label: "❌ Password is not a string (number)",
//     input: 1234567778,
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Password is not a string (object)",
//     input: { pass: "abc" },
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Too short (length ≤ 3)",
//     input: "abc",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Too long (length ≥ 200)",
//     input: "a".repeat(200),
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains whitespace (middle)",
//     input: "secure pass",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains whitespace (leading)",
//     input: " securePass",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains whitespace (trailing)",
//     input: "securePass ",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains multiple spaces",
//     input: "secure   pass",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains emoji",
//     input: "secure🔥Pass",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains multiple emojis",
//     input: "💡secure🚀Pass🔥",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains control character (newline)",
//     input: "secure\nPass",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains control character (tab)",
//     input: "secure\tPass",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "❌ Contains control character (null)",
//     input: "secure\u0000Pass",
//     expectError: true,
//     expectedCode: "INVALID_INPUT"
//   },
//   {
//     label: "✅ Password with symbols (allowed)",
//     input: "secure#Pass$123!",
//     expectError: false
//   },
//   {
//     label: "✅ Password with accented characters",
//     input: "sécuréPáss123",
//     expectError: false
//   },
//   {
//     label: "✅ Password with Unicode letters",
//     input: "Пароль安全123",
//     expectError: false
//   }
// ];

// for (const { label, input, expectError, expectedCode } of testCases) {
//   try {
//     const result = validatePasswordInput(input);
//   } catch (error) {
//     if (expectError) {
//       console.log("Caught AppError:", error.code);
//       if (expectedCode && error.code !== expectedCode) {
//         console.error(`❌ Expected code ${expectedCode}, but got ${error.code}`);
//       }
//     } else {
//       console.error("❌ Unexpected error:", error);
//     }
//   }
// }
