
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