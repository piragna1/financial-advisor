// src/validators/auth/validateToken.js
import {AppError} from '../../../errors/AppError.js'
import {AuthErrors} from '../../../errors/authErrors.js'

export function validateToken(token) {
  if (typeof token !== "string" || token.trim() === "") {
    throw new AppError(AuthErrors.INVALID_TOKEN, "Missing or empty token");
  }

  const trimmed = token.trim();

  if (trimmed.length < 10) {
    throw new AppError(AuthErrors.INVALID_TOKEN, "Token is too short");
  }

  const tokenRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  if (!tokenRegex.test(trimmed)) {
    throw new AppError(AuthErrors.INVALID_TOKEN, "Token format is invalid");
  }

  return trimmed;
}