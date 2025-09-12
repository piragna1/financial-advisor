import { extractToken } from "../actors/auth/extractToken.js";
import { tokenExists } from "../actors/auth/tokenExists.js";
import { AppError } from "../errors/AppError.js";
import { TokenErrors } from "../errors/tokenError.js";
import { verifyToken } from "../utils/auth/verifyToken.js";
import { decodePayload, generateToken } from "../utils/auth/token.js";
import { isTokenExpired } from "../utils/auth/token.js";
import { jwtConfig } from "../config/jwtConfig.js";

export async function authMiddleware(req, res, next) {
  if (!tokenExists(req)) throw new AppError(TokenErrors.MISSING_TOKEN);

  const token = extractToken(req); //pure

  await verifyToken(token); //semi-pure

  const payload = decodePayload(token);//pure
  if (isTokenExpired(payload)) throw new AppError(TokenErrors.EXPIRED_TOKEN);

  req.userId = payload.sub;

  next(); 
}

// console.log(generateToken('u1', jwtConfig.SECRET_SALT));//

const req = {
  headers: {
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1MSIsImlhdCI6MTc1NzcxMjYxMiwiZXhwIjoxNzU3NzE2MjEyfQ.N-wMloQ0MBzEoOyMGNYvkHx7S-IPF75kBbaeTdb64Ik'
  }
};

const res = {};
let nextCalled = false;
const next = () => { nextCalled = true; };

(async () => {
  try {
    await authMiddleware(req, res, next);
    console.log(nextCalled ? `✅ Middleware passed, userId: ${req.userId}` : `❌ Middleware did not call next()`);
  } catch (err) {
    console.error(`❌ Middleware threw error: ${err.code}`);
  }
})();
