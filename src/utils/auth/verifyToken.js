import { AppError } from "../../errors/AppError.js";
import {generateSignature} from '../../actors/utils/auth/generateSignature.js'
import { decodePayload, generateToken, isTokenExpired } from "./token.js";
import {TokenErrors} from '../../errors/tokenError.js';
import { jwtConfig } from "../../config/jwtConfig.js";

export async function verifyToken(token) {

  const token_arr = token.split(".");
  const [base64Header, base64Payload, base64Signature] = [token_arr[0].slice(7),token_arr[1],token_arr[2]];

  if (!base64Header) {throw new AppError(TokenErrors.INVALID_HEADER);}
  if (!base64Payload) {throw new AppError(TokenErrors.INVALID_PAYLOAD);}
  if (!base64Signature) {throw new AppError(TokenErrors.INVALID_SIGNATURE);}
  
  const expectedSignature = generateSignature(`${base64Header}.${base64Payload}`,jwtConfig.SECRET_SALT);

  if (base64Signature !== expectedSignature) {
    throw new AppError(TokenErrors.INVALID_SIGNATURE);
  }

  return true;
}