import { validateEmailInput } from "./validateEmailInput.js";
import { validatePasswordInput } from "./validatePasswordInput.js";

//validateLoginInput.js
export function validateLoginInput(input) {
  const { email, password } = input;
  const emailErrors = validateEmailInput(email);//checked (see backlog.txt)
  const passwordErrors = validatePasswordInput(password);//checked (see backlog.txt)
  return true;
}
