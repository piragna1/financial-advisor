import { extractToken } from "../actors/auth/extractToken.js";
import { tokenExists } from "../actors/auth/tokenExists.js";
import { AppError } from "../errors/AppError.js";
import { TokenErrors } from "../errors/tokenError.js";
import { verifyToken } from "../utils/auth/verifyToken.js";
import { decodePayload, generateToken } from "../utils/auth/token.js";
import { isTokenExpired } from "../utils/auth/token.js";
import { jwtConfig } from "../config/jwtConfig.js";
import { generateSignature } from "../utils/auth/generateSignature.js";
import { issueToken } from "../utils/auth/tokenIssuer.js";

export async function authMiddleware(req, res, next) {
  if (!tokenExists(req)) throw new AppError(TokenErrors.MISSING_TOKEN);

  const token = extractToken(req); //pure

  await verifyToken(token); //semi-pure

  const payload = decodePayload(token); //pure

  if (isTokenExpired(payload)) throw new AppError(TokenErrors.EXPIRED_TOKEN);

  req.userId = payload.sub;

  next();
}

// console.log(generateToken('u1', jwtConfig.SECRET_SALT,160000));//
async function testAuth(req, expectedUserId) {
  const now = Math.floor(Date.now() / 1000);
  const future = now + 3600;
  const past = now - 3600;

  const tokenInputs = [
    // {
    //   label: "✅ valid token",
    //   authorization: buildToken(
    //     { sub: "u1", iat: now, exp: future },
    //     jwtConfig.SECRET_SALT
    //   ),
    //   expect: "pass",
    // },
    // {
    //   label: "❌ expired token",
    //   authorization: buildToken(
    //     { sub: "u1", iat: past, exp: past },
    //     jwtConfig.SECRET_SALT
    //   ),
    //   expect: "EXPIRED_TOKEN",
    // },
    {
      label: "❌ missing sub field",
      authorization: buildToken(
        { iat: now, exp: future },
        jwtConfig.SECRET_SALT
      ),
      expect: "INVALID_TOKEN",
    },
    {
      label: "❌ numeric sub field",
      authorization: buildToken(
        { sub: 12345, iat: now, exp: future },
        jwtConfig.SECRET_SALT
      ),
      expect: "INVALID_TOKEN",
    },
    // {
    //   label: "❌ missing exp field",
    //   authorization: buildToken({ sub: "u1", iat: now }, jwtConfig.SECRET_SALT),
    //   expect: "INVALID_PAYLOAD",
    // },
    // {
    //   label: "❌ exp is string",
    //   authorization: buildToken(
    //     { sub: "u1", iat: now, exp: String(future) },
    //     jwtConfig.SECRET_SALT
    //   ),
    //   expect: "INVALID_PAYLOAD",
    // },
    // {
    //   label: "❌ exp is zero",
    //   authorization: buildToken(
    //     { sub: "u1", iat: now, exp: 0 },
    //     jwtConfig.SECRET_SALT
    //   ),
    //   expect: "EXPIRED_TOKEN",
    // },
    // {
    //   label: "❌ exp is NaN",
    //   authorization: buildToken(
    //     { sub: "u1", iat: now, exp: NaN },
    //     jwtConfig.SECRET_SALT
    //   ),
    //   expect: "INVALID_PAYLOAD",
    // },
  ];

  for (const test of tokenInputs) {
    runTest(test);
  }

}

testAuth();

async function runTest({ label, authorization, expect }) {
  const req = { headers: { authorization } };
  const res = {};
  let nextCalled = false;
  const next = () => { nextCalled = true; };

  try {
    await authMiddleware(req, res, next);
    if (expect === "pass" && nextCalled) {
      console.log(`✅ ${label} → passed`);
    } else {
      console.log(`❌ ${label} → expected ${expect}, got success`);
    }
  } catch (err) {
    const match = err.code === TokenErrors[expect]?.code;
    console.log(
      match
        ? `✅ ${label} threw ${err.code}`
        : `❌ ${label} threw ${err.code}, expected ${TokenErrors[expect]?.code}`
    );
  }
}
function buildToken(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const headerB64 = Buffer.from(JSON.stringify(header)).toString("base64url");
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = generateSignature(`${headerB64}.${payloadB64}`, secret);
  return `Bearer ${headerB64}.${payloadB64}.${signature}`;
}
