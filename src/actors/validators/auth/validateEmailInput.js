import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";

export function validateEmailInput(email) {
  if (!email) {
    throw new Error('Email is required');
  } else {
    if (email && typeof email !== "string") {
      throw new Error('Email must be a string')
    } else if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      throw new Error('Email must be a string')
    }
  }
  return true;
}