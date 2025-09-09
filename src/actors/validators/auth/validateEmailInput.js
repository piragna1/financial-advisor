import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors";

export function validateEmailInput(email) {
  if (!email) {
    errors.push("Email is required");
    throw new AppError(AuthErrors.MISSING_CREDENTIALS);
  } else {
    if (email && typeof email !== "string") {
      throw new AppError(AuthErrors.INVALID_INPUT)
    } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      throw new AppError(AuthErrors.INVALID_INPUT)
    }
  }
  return true;
}