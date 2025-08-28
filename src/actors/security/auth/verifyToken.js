import { AppError } from "../../../errors/AppError";
import {generateSignature} from '../../../actors/utils/auth/generateSignature.js'

export function verifyToken(token, secret = "simulationSecret",req) {
  const [base64Header, base64Payload, base64Signature] = token.split(".");

  if (!base64Header) {throw new Error(TokenErrors.INVALID_HEADER);}
  if (!base64Payload) {throw new Error(TokenErrors.INVALID_PAYLOAD);}
  if (!base64Signature) {throw new AppError(TokenErrors.INVALID_SIGNATURE);}

  const expectedSignature = generateSignature(
    `${base64Header}.${base64Payload}`,
    secret
  );

  if (base64Signature !== expectedSignature) {
    throw new AppError(TokenErrors.INVALID_SIGNATURE);
  }
  
  req.user.payload = JSON.parse(Buffer.from(base64Payload, 'base64url').toString());

  return true;
}