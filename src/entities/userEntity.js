import { AppError } from "../errors/AppError.js";
import { AuthErrors } from "../errors/authErrors.js";
import assert from "assert";

export function buildUserEntity({ id, email, hashedPassword }) {


  if (!id || !email || !hashedPassword) {
    throw new AppError(AuthErrors.MISSING_CREDENTIALS);
  }
  if (
    typeof id != "string" ||
    typeof email != "string" ||
    typeof hashedPassword != "string"
  ) {
    throw new AppError(AuthErrors.INVALID_INPUT, "Format of data is invalid");
  }
  const user = {
    id,
    email,
    hashedPassword,
    createdAt: Date.now(),
  };
  return user;
}
