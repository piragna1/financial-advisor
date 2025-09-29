import { extractToken } from "../actors/auth/extractToken.js";
import { tokenExists } from "../actors/auth/tokenExists.js";
import { AppError } from "../errors/AppError.js";
import { TokenErrors } from "../errors/tokenError.js";
import { verifyToken } from "../utils/auth/verifyToken.js";
import { decodePayload } from "../utils/auth/token.js";
import { isTokenExpired } from "../utils/auth/token.js";
import { validatePayloadStructure } from '../actors/auth/validatePayloadStructure.js'
export async function authMiddleware(req, res, next) {
  if (!tokenExists(req)) throw new AppError(TokenErrors.MISSING_TOKEN);

  const token = extractToken(req); //pure

  await verifyToken(token); //semi-pure

  const payload = decodePayload(token); //pure

  validatePayloadStructure(payload);

  if (isTokenExpired(payload)) throw new AppError(TokenErrors.EXPIRED_TOKEN);

  req.userId = payload.sub;

  next();
}
