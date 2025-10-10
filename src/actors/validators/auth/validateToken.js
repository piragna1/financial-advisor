import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";

export function validateToken(token) {
  //not a string or empty string
  if (typeof token !== "string" || token.trim() === "") {
    throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN, "Missing or empty token");
  }

  const trimmed = token.trim();
  //normalize 'Bearer'
  const normalized = trimmed.startsWith("Bearer ") ? trimmed.slice(7).trim() : trimmed;

  //split
  const parts = normalized.split(".");
  if (parts.length !== 3) {
    throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN, "Token must have 3 parts");
  }

  //regex
  const base64urlRegex = /^[A-Za-z0-9\-_]+$/;
  if (!parts.every((p) => base64urlRegex.test(p))) {
    throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN, "Token parts must be base64url-safe");
  }

  //expected length
  if (normalized.length < 8) {
    throw new AppError(AuthErrors.TOKEN.INVALID_TOKEN, "Token is too short");
  }

  return true;
}