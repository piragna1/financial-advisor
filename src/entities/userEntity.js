import { AuthErrors } from "../errors/authErrors.js";
import { AppError } from "../errors/AppError.js";
import {UserErrors} from '../errors/userErrors.js'

export function buildUserEntity({ id, email, hashedPassword }) {


  if (!id || !email || !hashedPassword) {
    throw new AppError(UserErrors.CREATE.INVALID_INPUT);
  }
  if (
    typeof id != "string" ||
    typeof email != "string" ||
    typeof hashedPassword != "string"
  ) {
    throw new AppError(UserErrors.CREATE.INVALID_INPUT);
  }
  const user = {
    id,
    email,
    hashedPassword,
    createdAt: Date.now(),
  };
  return user;
}
