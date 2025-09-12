import { extractToken } from "../actors/utils/auth/extractToken.js";
import { tokenExists } from "../actors/auth/tokenExists.js";
import { AppError } from "../errors/AppError.js";
import { TokenErrors } from "../errors/tokenError.js";
import { verifyToken } from "../utils/auth/verifyToken.js";
import { decodePayload } from "../utils/auth/token.js";
import { isTokenExpired } from "../utils/auth/token.js";

export async function authMiddleware(req, res, next) {
  if (!tokenExists(req)) throw new AppError(TokenErrors.MISSING_TOKEN);

  const token = extractToken(req); //pure

  await verifyToken(token); //semi-pure

  const payload = decodePayload(token);//pure
  if (isTokenExpired(payload)) throw new AppError(TokenErrors.EXPIRED_TOKEN);

  req.userId = payload.sub;

  if (valid) next(); 

  else throw new AppError(TokenErrors.INVALID_TOKEN);
}

const testCases = [
  {
    label: 'Missing token',
    req: { headers: {} },
  },
  {
    label: 'Malformed token',
    req: { headers: { authorization: 'Bearer malformed' } },
  },
  {
    label: 'Expired token',
    req: { headers: { authorization: 'Bearer expired' } },
  },
  {
    label: 'Valid token',
    req: { headers: { authorization: 'Bearer valid' } },
  },
  {
    label: 'Token generation failure',
    req: { headers: { authorization: 'Bearer fail' } },
  },
];

for (const test of testCases) {
  const res = {};
  const next = () => console.log(`✅ ${test.label}: next() called`);
  authMiddleware(test.req, res, next)
    .then(() => console.log(`✅ ${test.label}: passed`))
    .catch(err => console.log(`❌ ${test.label}:`, err.code || err.message));
}
