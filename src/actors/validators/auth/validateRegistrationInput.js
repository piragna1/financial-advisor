import { validateEmailInput } from "./validateEmailInput.js";
import { validatePasswordInput } from "./validatePasswordInput.js";
import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";

export function validateRegistrationInput(input) {
  const errors = {};

  if (!input) {
    throw new AppError(AuthErrors.MISSING_CREDENTIALS, "Empty input received");
  } else {
    console.log('else{}')
    console.log('input:', input)
  }

    if (!input.email) {
      errors["email"] = "Email is required";
    } else {
      try {
        const emailErrors = validateEmailInput(input.email);
      } catch (error) {
        errors.email = [error.details || error.message];
      }
    }

    if (!input.password) {
      errors["password"] = "Password is required";
    } else {
      try {
        const passwordErrors = validatePasswordInput(input.password);
      } catch (error) {
        console.log("catching password error");
        errors.password = [error.details || error.message];
      }
    }

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      throw new AppError(AuthErrors.REGISTER.INVALID_INPUT);
    }
  return true;
}
