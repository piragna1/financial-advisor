import { AppError } from "../../errors/AppError.js";
import {generateSignature} from '../../actors/utils/auth/generateSignature.js'
import { decodePayload, isTokenExpired } from "./token.js";
import {TokenErrors} from '../../errors/tokenError.js';
import {extractToken} from '../../actors/utils/auth/extractToken.js';

export function verifyToken(req,res,next,secret = "simulationSecret") {

  if (!req.token) throw new AppError(TokenErrors.MISSING_TOKEN);
  const token = extractToken(req);

  const [base64Header, base64Payload, base64Signature] = token.split(".");
  if (!base64Header) {throw new AppError(TokenErrors.INVALID_HEADER);}
  if (!base64Payload) {throw new AppError(TokenErrors.INVALID_PAYLOAD);}
  if (!base64Signature) {throw new AppError(TokenErrors.INVALID_SIGNATURE);}

  const expectedSignature = generateSignature(
    `${base64Header}.${base64Payload}`,
    secret
  );
  if (base64Signature !== expectedSignature) {
    throw new AppError(TokenErrors.INVALID_SIGNATURE);
  }

  const decoded = decodePayload(token);
  if (isTokenExpired(decoded)) throw new AppError(TokenErrors.EXPIRED_TOKEN);
  req.user.payload = decoded;

  next();
}