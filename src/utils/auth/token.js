import { AppError } from "../../errors/AppError.js";
import { AuthErrors } from "../../errors/authErrors.js";
import { generateSignature } from "./generateSignature.js";
/**
 * Generate a token for a given user with a default expiration time of 3600 seconds.
 * @param {*} userId The id of the user to who the token will be generated.
 * @param {*} secret The secret salt for generating the token.
 * @param {*} expiresInSeconds Expiration time of the token in seconds.
 * @returns The token generated.
 * @example generateToken('userid1', 'salt', 7200);
 */
export function generateToken(
  userId,
  secret = "secret",
  expiresInSeconds = 3600
) {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInSeconds;
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    sub: userId,
    iat: now,
    exp,
  };
  const base64Header = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url"
  );
  const base64Signature = generateSignature(
    `${base64Header}.${base64Payload}`,
    secret
  );
  return `${base64Header}.${base64Payload}.${base64Signature}`;
}

export function decodePayload(token) {
  try {
    const payloadB64 = token.split(".")[1];
    const payload1 = Buffer.from(payloadB64, "base64url").toString();
    const payload2 = JSON.parse(payload1);
    return payload2;
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(payload) {
  if ((!payload || !payload.exp || typeof payload.exp !== 'number' ) && payload.exp !== 0) throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
  const now = Math.floor(Date.now() / 1000);
  console.log(`
    payload.exp -> ${payload["exp"]}
    now ->         ${now}`);
  return now > payload.exp;
}


// function suite() {
//   const testCases = [
//     { userId: "user1", secret: "salt123", expiresInSeconds: 1 },
//     { userId: "user2", secret: "salt456", expiresInSeconds: 7200 },
//     { userId: "admin", secret: "adminSecret", expiresInSeconds: 1800 },
//     { userId: "guest", secret: "guestKey", expiresInSeconds: 60 },
//     { userId: "user_äöü", secret: "unicodeSecret", expiresInSeconds: 3600 },
//     { userId: "user-with-hyphen", secret: "hyphenSecret", expiresInSeconds: 3600 },
//     { userId: "user.with.dot", secret: "dotSecret", expiresInSeconds: 3600 },
//     { userId: "user@domain.com", secret: "emailSecret", expiresInSeconds: 3600 },
//     { userId: "1234567890", secret: "numericSecret", expiresInSeconds: 3600 },
//     { userId: "user💥", secret: "emojiSecret", expiresInSeconds: 3600 },
//     { userId: "user", secret: "", expiresInSeconds: 3600 },
//     { userId: "", secret: "emptyUserSecret", expiresInSeconds: 3600 },
//     { userId: "nullUser", secret: null, expiresInSeconds: 3600 },
//     { userId: "undefinedUser", secret: undefined, expiresInSeconds: 3600 },
//     { userId: "longUserId_" + "x".repeat(100), secret: "longSecret", expiresInSeconds: 3600 },
//     { userId: "user", secret: "salt", expiresInSeconds: 0 },
//     { userId: "user", secret: "salt", expiresInSeconds: -100 },
//     { userId: "user", secret: "salt", expiresInSeconds: Number.MAX_SAFE_INTEGER },
//     { userId: "user", secret: "salt", expiresInSeconds: 1 },
//     { userId: "user", secret: "salt", expiresInSeconds: 999999 },
//     { userId: "user1", secret: "salt123", expiresInSeconds: 3600 },
//     // Add more edge cases as needed
//   ];

//   (async () => {
//     for (const [index, testCase] of testCases.entries()) {
//       try {
//         const token = generateToken(
//           testCase.userId,
//           testCase.secret,
//           testCase.expiresInSeconds
//         );
//         await wait(2);
//         console.log(`Test #${index + 1}:`, token);

//         const payload = decodePayload(token);
//         const expired = isTokenExpired(payload);
//         console.log(token);
//         console.log(payload);
//         console.log(expired);
//       } catch (error) {
//         console.error(`Test #${index + 1} failed:`, error.message);
//       }
//     }
//     const token = generateToken(
//       testCases["0"]["userId"],
//       testCases["0"]["secret"],
//       0
//     );
//   })();
// }
// function wait(seconds) {
//   return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
// }
// suite();


// const validObject = { userId: 'abc123', role: 'admin' };
// const nestedObject = { user: { id: 'u1', name: 'Gonzalo' }, meta: { active: true } };
// const unicodeObject = { name: 'José', city: 'München', script: '漢字' };
// const emojiObject = { mood: '🔥', status: '✅' };
// const arrayPayload = [1, 2, 3];
// const stringPayload = 'hello world';
// const numberPayload = 42;
// const booleanPayload = true;
// const nullPayload = null;
// const malformedJSON = '{userId:"abc123"'; // missing closing brace
// const nonBase64 = '%%%'; // invalid base64url

// const testCases = [
//   {
//     label: 'valid object payload',
//     input: validObject,
//     expected: validObject,
//   },
//   {
//     label: 'nested object payload',
//     input: nestedObject,
//     expected: nestedObject,
//   },
//   {
//     label: 'unicode object payload',
//     input: unicodeObject,
//     expected: unicodeObject,
//   },
//   {
//     label: 'emoji object payload',
//     input: emojiObject,
//     expected: emojiObject,
//   },
//   {
//     label: 'array payload',
//     input: arrayPayload,
//     expected: arrayPayload,
//   },
//   {
//     label: 'string payload',
//     input: stringPayload,
//     expected: stringPayload,
//   },
//   {
//     label: 'number payload',
//     input: numberPayload,
//     expected: numberPayload,
//   },
//   {
//     label: 'boolean payload',
//     input: booleanPayload,
//     expected: booleanPayload,
//   },
//   {
//     label: 'null payload',
//     input: nullPayload,
//     expected: null,
//   },
//   {
//     label: 'malformed JSON payload',
//     token: `header.${Buffer.from(malformedJSON).toString('base64url')}.signature`,
//     expected: null,
//     skipEncoding: true,
//   },
//   {
//     label: 'non-base64 payload',
//     token: `header.${nonBase64}.signature`,
//     expected: null,
//     skipEncoding: true,
//   },
//   {
//     label: 'missing payload segment',
//     token: `header..signature`,
//     expected: null,
//     skipEncoding: true,
//   },
//   {
//     label: 'token with only one segment',
//     token: `headeronly`,
//     expected: null,
//     skipEncoding: true,
//   },
//   {
//     label: 'empty token',
//     token: ``,
//     expected: null,
//     skipEncoding: true,
//   },
// ];

// for (const test of testCases) {
//   const token = test.skipEncoding
//     ? test.token
//     : `header.${Buffer.from(JSON.stringify(test.input)).toString('base64url')}.signature`;

//   const result = decodePayload(token);
//   console.log(result);
//   const match = JSON.stringify(result) === JSON.stringify(test.expected);
//   console.log(match ? `✅ ${test.label}` : `❌ ${test.label} → got ${JSON.stringify(result)}, expected ${JSON.stringify(test.expected)}`);
// }


const now = Math.floor(Date.now() / 1000);

const testCases = [
  // {
  //   label: 'payload is undefined',
  //   payload: undefined,
  //   expected: false,
  // },
  // {
  //   label: 'payload is null',
  //   payload: null,
  //   expected: false,
  // },
  // {
  //   label: 'payload missing exp field',
  //   payload: { userId: 'abc123' },
  //   expected: false,
  // },
  // {
  //   label: 'payload.exp is in the past',
  //   payload: { exp: now - 100 },
  //   expected: true,
  // },
  // {
  //   label: 'payload.exp is now',
  //   payload: { exp: now },
  //   expected: false,
  // },
  // {
  //   label: 'payload.exp is in the future',
  //   payload: { exp: now + 100 },
  //   expected: false,
  // },
  // {
  //   label: 'payload.exp is a string',
  //   payload: { exp: String(now + 100) },
  //   expected: false,
  // },
  // {
  //   label: 'payload.exp is non-numeric string',
  //   payload: { exp: 'not-a-timestamp' },
  //   expected: false,
  // },
  // {
  //   label: 'payload.exp is NaN',
  //   payload: { exp: NaN },
  //   expected: false,
  // },
  {
    label: 'payload.exp is zero',
    payload: { exp: 0 },
    expected: true,
  },
];

for (const { label, payload, expected } of testCases) {
  let result = undefined;
  try {
    result = isTokenExpired(payload);
    
  } catch (error) {
    // console.log('error----------->',error)  ;
    result=false;
  }
  const pass = result === expected;
  console.log(pass ? `✅ ${label}` : `❌ ${label} → got ${result}, expected ${expected}`);
}


