import { generateSignature } from "../../actors/utils/auth/generateSignature.js";
/**
 * Generate a token for a given user with a default expiration time of 3600 seconds.
 * @param {*} userId The id of the user to who the token will be generated.
 * @param {*} secret The secret salt for generating the token.
 * @param {*} expiresInSeconds Expiration time of the token in seconds.
 * @returns The token generated.
 * @example generateToken('userid1', 'salt', 7200);
 */
export async function generateToken(
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

