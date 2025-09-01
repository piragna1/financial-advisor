import { AppError } from "../../errors/AppError.js";
import {generateSignature} from '../../actors/utils/auth/generateSignature.js'
import { decodePayload, generateToken, isTokenExpired } from "./token.js";
import {TokenErrors} from '../../errors/tokenError.js';

export async function verifyToken(token) {

  const [base64Header, base64Payload, base64Signature] = token.split(".");

  base64Header.splice(6);
  console.log('base 64 Header', base64Header)
  // console.log('base 64 Payload', base64Payload)
  // console.log('base 64 Signature', base64Signature)
  
  if (!base64Header) {throw new AppError(TokenErrors.INVALID_HEADER);}
  if (!base64Payload) {throw new AppError(TokenErrors.INVALID_PAYLOAD);}
  if (!base64Signature) {throw new AppError(TokenErrors.INVALID_SIGNATURE);}

  const expectedSignature = generateSignature(`${base64Header}.${base64Payload}`);

  console.log('expectedSignature',expectedSignature)

  if (base64Signature !== expectedSignature) {
    throw new AppError(TokenErrors.INVALID_SIGNATURE);
  }

  return true;
}