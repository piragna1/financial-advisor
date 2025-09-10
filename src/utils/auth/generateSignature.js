import { createHmac } from "crypto";
/**
 *
 * @param {*} string The header and the payload of a token formatted as `header.payload`.
 * @param {*} secret The secret word for salting the token generation.
 * @returns
 */
export function generateSignature(string, secret = "secret") {
  if (typeof string !== "string") {
    throw Error("Invalid input key");
  }
  if (typeof secret !== "string" || secret.length === 0) {
    throw Error("Invalid secret");
  }
  const hmac = createHmac("sha256", secret);
  hmac.update(string);
  return hmac.digest("base64url");
}


// Test inputs (header.payload format)
const testInputs = [
  // ✅ Valid cases
  { input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkdvbnphbG8iLCJpYXQiOjE1MTYyMzkwMjJ9', secret: 'secret' },
  { input: 'header.payload', secret: 'mySecret' },
  { input: 'a.b', secret: 'salt123' },
  { input: 'eyJhbGciOiAiSFMyNTYifQ.eyJleHAiOjE3MDAwMDAwMDB9', secret: '🔐unicode' },
  { input: 'x.y', secret: 'x' },

  // ❌ Invalid string input
  { input: null, secret: 'secret' },
  { input: undefined, secret: 'secret' },
  { input: {}, secret: 'secret' },
  { input: 12345, secret: 'secret' },

  // ❌ Invalid secret
  { input: 'header.payload', secret: '' },
  { input: 'header.payload', secret: null },
  { input: 'header.payload', secret: 42 },
];

for (const { input, secret } of testInputs) {
  try {
    const result = generateSignature(input, secret);
    console.log(`Input: "${input}" | Secret: "${secret}" → Signature: ${result}`);
  } catch (error) {
    console.log(`Input: "${input}" | Secret: "${secret}" → Error: ${error.message}`);
  }
}