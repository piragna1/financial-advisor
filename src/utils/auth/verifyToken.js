import { AppError } from "../../errors/AppError.js";
import {generateSignature} from '../../actors/utils/auth/generateSignature.js'
import {TokenErrors} from '../../errors/tokenError.js';
import { jwtConfig } from "../../config/jwtConfig.js";

export async function verifyToken(token) {

  const token_components = token.split(".");

  let [base64Header] = [token_components[0]];
  if (base64Header.startsWith("Bearer ")){base64Header = base64Header.slice("Bearer ".length)};
  
  const [base64Payload, base64Signature] = [token_components[1],token_components[2]]

  if (!base64Header) {throw new AppError(TokenErrors.INVALID_HEADER);}
  if (!base64Payload) {throw new AppError(TokenErrors.INVALID_PAYLOAD);}
  if (!base64Signature) {throw new AppError(TokenErrors.INVALID_SIGNATURE);}
  
  const expectedSignature = generateSignature(`${base64Header}.${base64Payload}`,jwtConfig.SECRET_SALT);

  if (base64Signature !== expectedSignature) {
    throw new AppError(TokenErrors.INVALID_SIGNATURE);
  }

  return true;
}