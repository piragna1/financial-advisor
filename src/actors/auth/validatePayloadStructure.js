import { AppError } from "../../errors/AppError.js";
import { AuthErrors } from "../../errors/authErrors.js";

export function validatePayloadStructure(payload){
    if (!payload || typeof payload !== 'object'){
        throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
    }
    const {sub,iat, exp} = payload;

    if (!sub || typeof sub !== 'string') throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
    if (!iat || typeof iat !== 'number') throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
    if (!exp || typeof exp !== 'number') throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);

    return true;

}


function runTest(label, payload, expectErrorCode = null) {
  try {
    validatePayloadStructure(payload);
    if (expectErrorCode) {
      console.error(`❌ ${label} → expected ${expectErrorCode}, but passed`);
    } else {
      console.log(`✅ ${label} → passed`);
    }
  } catch (err) {
    if (err instanceof AppError && err.code === AuthErrors.TOKEN[expectErrorCode]?.code) {
      console.log(`✅ ${label} → threw ${err.code}`);
    } else {
      console.error(`❌ ${label} → threw ${err.code}, expected ${AuthErrors.TOKEN[expectErrorCode]?.code}`);
    }
  }
}

const validPayload = {
  sub: "u1",
  iat: Math.floor(Date.now() / 1000),
  exp: Math.floor(Date.now() / 1000) + 3600
};

const testCases = [
  // ✅ Valid payload
  ["valid payload", validPayload, null],

  // ❌ Null payload
  ["null payload", null, "INVALID_PAYLOAD"],

  // ❌ Undefined payload
  ["undefined payload", undefined, "INVALID_PAYLOAD"],

  // ❌ Non-object payloads
  ["string payload", "not-an-object", "INVALID_PAYLOAD"],
  ["number payload", 12345, "INVALID_PAYLOAD"],
  ["array payload", [], "INVALID_PAYLOAD"],
  ["boolean payload", true, "INVALID_PAYLOAD"],

  // ❌ Missing sub
  ["missing sub", { iat: validPayload.iat, exp: validPayload.exp }, "INVALID_PAYLOAD"],
  ["sub is null", { sub: null, iat: validPayload.iat, exp: validPayload.exp }, "INVALID_PAYLOAD"],
  ["sub is number", { sub: 123, iat: validPayload.iat, exp: validPayload.exp }, "INVALID_PAYLOAD"],
  ["sub is empty string", { sub: "", iat: validPayload.iat, exp: validPayload.exp }, "INVALID_PAYLOAD"],
  ["sub is whitespace", { sub: "   ", iat: validPayload.iat, exp: validPayload.exp }, "INVALID_PAYLOAD"],

  // ❌ Missing iat
  ["missing iat", { sub: "u1", exp: validPayload.exp }, "INVALID_PAYLOAD"],
  ["iat is string", { sub: "u1", iat: "123", exp: validPayload.exp }, "INVALID_PAYLOAD"],
  ["iat is null", { sub: "u1", iat: null, exp: validPayload.exp }, "INVALID_PAYLOAD"],
  ["iat is NaN", { sub: "u1", iat: NaN, exp: validPayload.exp }, "INVALID_PAYLOAD"],
  ["iat is Infinity", { sub: "u1", iat: Infinity, exp: validPayload.exp }, "INVALID_PAYLOAD"],

  // ❌ Missing exp
  ["missing exp", { sub: "u1", iat: validPayload.iat }, "INVALID_PAYLOAD"],
  ["exp is string", { sub: "u1", iat: validPayload.iat, exp: "999999" }, "INVALID_PAYLOAD"],
  ["exp is null", { sub: "u1", iat: validPayload.iat, exp: null }, "INVALID_PAYLOAD"],
  ["exp is NaN", { sub: "u1", iat: validPayload.iat, exp: NaN }, "INVALID_PAYLOAD"],
  ["exp is Infinity", { sub: "u1", iat: validPayload.iat, exp: Infinity }, "INVALID_PAYLOAD"],
  ["exp is negative", { sub: "u1", iat: validPayload.iat, exp: -100 }, "INVALID_PAYLOAD"],
  ["exp is zero", { sub: "u1", iat: validPayload.iat, exp: 0 }, "INVALID_PAYLOAD"]
];

for (const [label, payload, expectErrorCode] of testCases) {
  runTest(label, payload, expectErrorCode);
}
