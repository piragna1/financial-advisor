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

  const payload = decodePayload(token);//pure
  console.log('payload',payload)

  if (isTokenExpired(payload)) throw new AppError(TokenErrors.EXPIRED_TOKEN);

  req.userId = payload.sub;

  next(); 
}

// console.log(generateToken('u1', jwtConfig.SECRET_SALT));//
async function testAuth(req, expectedUserId) {
  const tokenInputs = [
  // // ✅ Valid token
  // {
  //   label: 'valid token',
  //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1MSIsImlhdCI6MTc1NzkzODM3NSwiZXhwIjoxNzU3OTQxOTc1fQ.FgGz24wcp25G2FFAbJYy7s95GMQQ8O9q_D22Pg1x1Mc',
  //   expect: 'pass'
  // },

  // // ❌ Missing authorization header
  // {
  //   label: 'missing authorization header',
  //   authorization: undefined,
  //   expect: 'MISSING_TOKEN'
  // },

  // // ❌ Empty token string
  // {
  //   label: 'empty token',
  //   authorization: 'Bearer ',
  //   expect: 'INVALID_TOKEN'
  // },

  // // ❌ Malformed token structure
  // {
  //   label: 'malformed token structure',
  //   authorization: 'Bearer not.a.jwt',
  //   expect: 'INVALID_SIGNATURE'
  // },

  // // ❌ Invalid signature
  // {
  //   label: 'invalid signature',
  //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1MSIsImV4cCI6MTc1ODAwMDAwMH0.invalidsig',
  //   expect: 'INVALID_SIGNATURE'
  // },

  // ❌ Expired token
  {
    label: 'expired token',
    authorization: `Bearer ${Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString('base64url')}.eyJzdWIiOiJlbGNhY28iLCJpYXQiOjE3NTc5NDEzNjksImV4cCI6MTc1Nzk0MTAwMH0${generateSignature( Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString('base64url')+'.eyJzdWIiOiJlbGNhY28iLCJpYXQiOjE3NTc5NDEzNjksImV4cCI6MTc1Nzk0MTAwMH0' )}`,
    expect: 'EXPIRED_TOKEN'
  },

  // // ❌ Undecodable payload
  // {
  //   label: 'undecodable payload',
  //   authorization: 'Bearer header.@@@.signature',
  //   expect: 'INVALID_TOKEN'
  // },

  // // ❌ Missing sub field
  // {
  //   label: 'missing sub field',
  //   authorization: 'Bearer header.' + Buffer.from(JSON.stringify({ exp: 9999999999 })).toString('base64url') + '.signature',
  //   expect: 'INVALID_TOKEN'
  // },

  // // ❌ Non-string sub
  // {
  //   label: 'numeric sub field',
  //   authorization: 'Bearer header.' + Buffer.from(JSON.stringify({ sub: 12345, exp: 9999999999 })).toString('base64url') + '.signature',
  //   expect: 'INVALID_TOKEN'
  // },

  // // ❌ Missing exp field
  // {
  //   label: 'missing exp field',
  //   authorization: 'Bearer header.' + Buffer.from(JSON.stringify({ sub: 'u1' })).toString('base64url') + '.signature',
  //   expect: 'INVALID_PAYLOAD'
  // },

  // // ❌ exp is string
  // {
  //   label: 'exp is string',
  //   authorization: 'Bearer header.' + Buffer.from(JSON.stringify({ sub: 'u1', exp: "9999999999" })).toString('base64url') + '.signature',
  //   expect: 'INVALID_PAYLOAD'
  // },

  // // ❌ exp is zero
  // {
  //   label: 'exp is zero',
  //   authorization: 'Bearer header.' + Buffer.from(JSON.stringify({ sub: 'u1', exp: 0 })).toString('base64url') + '.signature',
  //   expect: 'EXPIRED_TOKEN'
  // },

  // // ❌ exp is NaN
  // {
  //   label: 'exp is NaN',
  //   authorization: 'Bearer header.' + Buffer.from(JSON.stringify({ sub: 'u1', exp: NaN })).toString('base64url') + '.signature',
  //   expect: 'INVALID_PAYLOAD'
  // }
];
for (const { label, authorization, expect } of tokenInputs) {
  const req = { headers: { authorization } };
  const res = {};
  let nextCalled = false;
  const next = () => { nextCalled = true; };

  (async () => {
    try {
      await authMiddleware(req, res, next);
      if (expect === 'pass' && nextCalled) {
        console.log(`✅ ${label} → passed`);
      } else {
        console.log(`❌ ${label} → expected ${expect}, got success`);
      }
    } catch (err) {
      const match = err.code === TokenErrors[expect]?.code;
      console.log(match ? `✅ ${label} threw ${err.code}` : `❌ ${label} threw ${err.code}, expected ${TokenErrors[expect]?.code}`);
    }
  })();
}

}

testAuth();