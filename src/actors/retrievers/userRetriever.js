//userRetriever.js
import { findUserByEmail, findUserById } from "../../repositories/userRepo.js";
import {AppError} from '../../errors/AppError.js;
import {AuthErrors} from '../../errors/authErrors.js'

export async function retrieveUserByEmail(email) {
  //checked
  return await findUserByEmail(email);
}
export async function retrieveUserById(id) {
  if (!id || typeof id != "string") {
    throw new AppError(AuthErrors.MISSING_CREDENTIALS, "Id is missing");
  }
  if (typeof id != "string") {
    throw new AppError(AuthErrors.INVALID_INPUT, "Id must be a string");
  }
  const userId = req.userId;
  const user = await findUserById(userId); //semi-pure
  return user;
}
