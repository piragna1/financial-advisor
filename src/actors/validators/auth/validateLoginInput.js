import { validateEmailInput } from "./validateEmailInput.js";
import { validatePasswordInput } from "./validatePasswordInput.js";

//validateLoginInput.js
export function validateLoginInput(input) {
  const { email, password } = input;
  const emailErrors = validateEmailInput(email);
  const passwordErrors = validatePasswordInput(password);
  const errors = {email:emailErrors, password:passwordErrors}
  return errors;
}
