//userRetriever.js
import { findUserByEmail, findUserById } from "../../repositories/userRepository.js";
import {AppError} from '../../errors/AppError.js';
import {AuthErrors} from '../../errors/authErrors.js'

export async function retrieveUserByEmail(email) {
  console.log('retrieveUserByEmail()')
  //checked
  return await findUserByEmail(email);
}
export async function retrieveUserById(id) {
  console.log('retrieveUesrById')

  if (!id || typeof id != "string") {
    throw new AppError(AuthErrors.MISSING_CREDENTIALS, "Id is missing");
  }
  if (typeof id != "string") {
    throw new AppError(AuthErrors.INVALID_INPUT, "Id must be a string");
  }
  const userId = id;
  const user = await findUserById(userId); //semi-pure


  console.log('returning user', user)
  return user;
}
