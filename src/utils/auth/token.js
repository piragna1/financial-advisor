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
  secret='secret',
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
  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const base64Signature = generateSignature(`${base64Header}.${base64Payload}`,secret);
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
  if (!payload || !payload.exp) return true;
  const now = Math.floor(Date.now() / 1000); //use this
  return now > payload.exp;
}



function suite(){

const testCases = [
  { userId: "user1", secret: "salt123", expiresInSeconds: 3600 },
  { userId: "user2", secret: "salt456", expiresInSeconds: 7200 },
  { userId: "admin", secret: "adminSecret", expiresInSeconds: 1800 },
  { userId: "guest", secret: "guestKey", expiresInSeconds: 60 },
  { userId: "user_äöü", secret: "unicodeSecret", expiresInSeconds: 3600 },
  { userId: "user-with-hyphen", secret: "hyphenSecret", expiresInSeconds: 3600 },
  { userId: "user.with.dot", secret: "dotSecret", expiresInSeconds: 3600 },
  { userId: "user@domain.com", secret: "emailSecret", expiresInSeconds: 3600 },
  { userId: "1234567890", secret: "numericSecret", expiresInSeconds: 3600 },
  { userId: "user💥", secret: "emojiSecret", expiresInSeconds: 3600 },
  { userId: "user", secret: "", expiresInSeconds: 3600 },
  { userId: "", secret: "emptyUserSecret", expiresInSeconds: 3600 },
  { userId: "nullUser", secret: null, expiresInSeconds: 3600 },
  { userId: "undefinedUser", secret: undefined, expiresInSeconds: 3600 },
  { userId: "longUserId_" + "x".repeat(100), secret: "longSecret", expiresInSeconds: 3600 },
  { userId: "user", secret: "salt", expiresInSeconds: 0 },
  { userId: "user", secret: "salt", expiresInSeconds: -100 },
  { userId: "user", secret: "salt", expiresInSeconds: Number.MAX_SAFE_INTEGER },
  { userId: "user", secret: "salt", expiresInSeconds: 1 },
  { userId: "user", secret: "salt", expiresInSeconds: 999999 },
  { userId: "user1", secret: "salt123", expiresInSeconds: 3600 },
  // Add more edge cases as needed
];

(async () => {
  for (const [index, testCase] of testCases.entries()) {
    try {
      const token = await generateToken(
        testCase.userId,
        testCase.secret,
        testCase.expiresInSeconds
      );
      console.log(`Test #${index + 1}:`, token);
    } catch (error) {
      console.error(`Test #${index + 1} failed:`, error.message);
    }
  }
  const token = generateToken(
    {
      userId:testCases['0']['userId'],
      secret:testCases['0']['secret'],
      expiresInSeconds:testCases['0']['expiresInSeconds']
    }
  );
  setTimeout(()=>{},3000)
  const payload = decodePayload(token);
  const expired = isTokenExpired(payload);
  console.log(token);
  console.log(payload);
  console.log(expired);

})();

}

suite();