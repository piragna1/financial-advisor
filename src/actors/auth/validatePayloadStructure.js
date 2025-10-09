import { AppError } from "../../errors/AppError.js";
import { AuthErrors } from "../../errors/authErrors.js";

export function validatePayloadStructure(payload) {
  if (!payload || typeof payload !== "object") {
    throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
  }
  const { sub, iat, exp } = payload;

  if (!sub || typeof sub !== "string" || sub.trim() === "")
    throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);

  if (!iat || typeof iat !== "number" || iat === Infinity || iat <0)
    throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);

  if (!exp || typeof exp !== "number" || exp === Infinity || exp<0)
    throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);

  return true;
}
