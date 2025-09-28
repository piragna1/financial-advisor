import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";
import assert from "assert";

export function buildUserEntity({ id, email, hashedPassword }) {

console.log('receiving in buildUserEntity', {id,email,hashedPassword})

  if (!id || !email || !hashedPassword) {
    throw new AppError(AuthErrors.MISSING_CREDENTIALS);
  }
  if (
    typeof id != "string" ||
    typeof email != "string" ||
    typeof hashedPassword != "string"
  ) {
    throw new AppError(AuthErrors.INVALID_INPUT, "Format of data is invalid");
  }
  const user = {
    id,
    email,
    hashedPassword,
    createdAt: Date.now(),
  };
  return user;
}

// const testCases = [
//   {
//     label: '✅ Valid input',
//     input: {
//       id: '1',
//       name: 'Gonzalo',
//       lastName: 'Var',
//       email: 'gonzalo@example.com',
//       hashedPassword: 'abc123'
//     }
//   },
//   {
//     label: '❌ Missing id',
//     input: {
//       name: 'Gon',
//       email: 'x',
//       hashedPassword: 'x'
//     }
//   },
//   {
//     label: '❌ Missing name',
//     input: {
//       id: '1',
//       email: 'x',
//       hashedPassword: 'x'
//     }
//   },
//   {
//     label: '❌ Invalid id type (number)',
//     input: {
//       id: 123,
//       name: 'Gon',
//       email: 'x',
//       hashedPassword: 'x'
//     }
//   },
//   {
//     label: '❌ Invalid lastName type (array)',
//     input: {
//       id: '1',
//       name: 'Gon',
//       lastName: [],
//       email: 'x',
//       hashedPassword: 'x'
//     }
//   },
//   {
//     label: '✅ Unicode name and lastName',
//     input: {
//       id: '2',
//       name: 'Gonzálø',
//       lastName: 'Łópez',
//       email: 'gon@example.com',
//       hashedPassword: 'abc123'
//     }
//   },
//   {
//     label: '✅ No lastName provided',
//     input: {
//       id: '3',
//       name: 'Gon',
//       email: 'gon@example.com',
//       hashedPassword: 'abc123'
//     }
//   },
//   {
//     label: '❌ Empty hashedPassword',
//     input: {
//       id: '4',
//       name: 'Gon',
//       email: 'gon@example.com',
//       hashedPassword: ''
//     }
//   }
// ];

// for (const { label, input } of testCases) {
//   try {
//     const result = buildUserEntity(input);
//     console.log(`${label}: PASSED`, result);
//   } catch (error) {
//     if (error instanceof AppError) {
//       console.log(`${label}: FAILED with AppError —`, error.message);
//     } else {
//       console.log(`${label}: FAILED with unexpected error —`, error);
//     }
//   }
// }
