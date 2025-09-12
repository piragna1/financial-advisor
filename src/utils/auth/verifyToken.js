import { AppError } from "../../errors/AppError.js";
import {generateSignature} from './generateSignature.js'
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

const validHeader = 'header';
const validPayload = 'payload';
const validSignature = generateSignature(`${validHeader}.${validPayload}`, jwtConfig.SECRET_SALT);
const bearerPrefix = 'Bearer ';

const testCases = [
  {
    label: 'token missing header',
    token: `.${validPayload}.${validSignature}`,
    expectError: TokenErrors.INVALID_HEADER,
  },
  {
    label: 'token missing payload',
    token: `${validHeader}..${validSignature}`,
    expectError: TokenErrors.INVALID_PAYLOAD,
  },
  {
    label: 'token missing signature',
    token: `${validHeader}.${validPayload}.`,
    expectError: TokenErrors.INVALID_SIGNATURE,
  },
  {
    label: 'token with invalid signature',
    token: `${validHeader}.${validPayload}.invalidsig`,
    expectError: TokenErrors.INVALID_SIGNATURE,
  },
  {
    label: 'token with Bearer prefix and valid signature',
    token: `${bearerPrefix}${validHeader}.${validPayload}.${validSignature}`,
    expect: true,
  },
  {
    label: 'token without Bearer prefix and valid signature',
    token: `${validHeader}.${validPayload}.${validSignature}`,
    expect: true,
  },
  {
    label:'manual case: empty token',
    token:`hola que tal`,
    expectError:TokenErrors.INVALID_TOKEN
  }
];

for (const test of testCases) {
  try {
    const result = await verifyToken(test.token);
    if (test.expect === true && result === true) {
      console.log(`✅ ${test.label}`);
    } else {
      console.error(`❌ ${test.label} → expected true, got ${result}`);
    }
  } catch (err) {
    const match = err.code === test.expectError.code;
    console.log(match ? `✅ ${test.label} threw ${err.code}` : `❌ ${test.label} threw ${err.code}, expected ${test.expectError.code}`);
  }
}
