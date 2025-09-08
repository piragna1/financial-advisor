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
//------------------------------------- TEST CASES
console.log('invalid email format');
console.log(
  validateLoginInput({ email: "gonzalo@.com", password: "lalala123" }) 
); 

console.log('correct input')
console.log(
  validateLoginInput({ email: "gonzalo@example.com", password: "lalala123" })
); 

console.log('email not string')
console.log(validateLoginInput({ email: 12345, password: "securePass123" }));
console.log('missing email')
console.log(validateLoginInput({ password: "securePass123" })); 
console.log('missing password')
console.log(validateLoginInput({ email: "user@example.com" })); 
console.log('password not string')
console.log(
  validateLoginInput({ email: "gonzalo@example.com", password: 123 })
); 
console.log('Missing email and missing password')
console.log(validateLoginInput({}));
console.log('Empty strings')
console.log(validateLoginInput({ email: "", password: "" })); 
// //-------------------------------------


