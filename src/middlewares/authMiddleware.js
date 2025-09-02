import { extractToken } from "../actors/utils/auth/extractToken.js";
import { tokenExists } from "../actors/utils/auth/tokenExists.js";
import { AppError } from "../errors/AppError.js";
import { TokenErrors } from "../errors/tokenError.js";
import { verifyToken } from "../utils/auth/verifyToken.js";
import { decodePayload } from "../utils/auth/token.js";
import { isTokenExpired } from "../utils/auth/token.js";

export async function authMiddleware(req, res, next) {
  if (!tokenExists(req)) throw new AppError(TokenErrors.MISSING_TOKEN);

  const token = extractToken(req);
  console.log('extracted token ->>>>',token);

  const valid = await verifyToken(token);
  console.log("valid", valid);

  const payload = decodePayload(token);
  console.log('decoded payload:',payload)

  if (isTokenExpired(payload)) throw new AppError(TokenErrors.EXPIRED_TOKEN);

  console.log("payload", payload);

  const userId = payload.sub;
  req.userId = userId;
  console.log("userId", userId);

  if (valid) next();
  else throw new AppError(TokenErrors.INVALID_TOKEN);
}
