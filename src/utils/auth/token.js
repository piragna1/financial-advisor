import { generateSignature } from "../../actors/utils/auth/generateSignature.js";
export async function generateToken(
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
    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString());
    return payload;
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(payload) {
  if (!payload || !payload.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return now > payload.exp;
}

