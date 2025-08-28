import { AppError } from "../../../errors/AppError";

export function verifyToken(token, secret = "simulationSecret") {
  const [base64Header, base64Payload, base64Signature] = token.split(".");
  if (!base64Header) {throw new Error("Invalid token structure");}
  if (!base64Payload) {throw new Error("Invalid token structure");}
  if (!base64Signature) {throw new AppError(TokenErrors.INVALID_SIGNATURE);}
  const expectedSignature = generateSignature(
    `${base64Header}.${base64Payload}`,
    secret
  );
  if (base64Signature !== expectedSignature) {
    throw new Error("Invalid token signature.");
  }
  return true;
}