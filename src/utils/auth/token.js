import { generateSignature } from "./signatureUtil";
export async function generateToken(
  userId,
  secret = "simulationSecret",
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

export function verifyToken(token, secret = "simulationSecret") {
  const [base64Header, base64Payload, base64Signature] = token.split(".");
  if (!base64Header || !base64Payload || !base64Signature) {
    throw new Error("Invalid token structure");
  }
  const expectedSignature = generateSignature(
    `${base64Header}.${base64Payload}`,
    secret
  );
  if (base64Signature !== expectedSignature) {
    throw new Error("Invalid token signature.");
  }
  return true;
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

