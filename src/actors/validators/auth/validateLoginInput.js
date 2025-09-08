import { validateEmailInput } from "./validateEmailInput";
import { validatePasswordInput } from "./validatePasswordInput";

//validateLoginInput.js
export function validateLoginInput(input) {
  const { email, password } = input;
  const emailErrors = validateEmailInput(email);
  const passwordErrors = validatePasswordInput(password);
  const errors = {email:emailErrors, password:passwordErrors}
  return errors;
}
//------------------------------------- TEST CASES

// //-----Works fine

// //--invalid email format
// console.log(
//   validateLoginInput({ email: "gonzalo@.com", password: "lalala123" }) //ok
// ); 

// //correct input
// console.log(
//   validateLoginInput({ email: "gonzalo@example.com", password: "lalala123" })
// ); //ok

// //email not string
// console.log(validateLoginInput({ email: 12345, password: "securePass123" }));//ok
// //missing email
// console.log(validateLoginInput({ password: "securePass123" })); //ok
// //missing password
// console.log(validateLoginInput({ email: "user@example.com" })); //ok
// //password not string
// console.log(
//   validateLoginInput({ email: "gonzalo@example.com", password: 123 })
// ); //ok
// //Missing email and missing password
// console.log(validateLoginInput({}));//ok
// //Empty strings
// console.log(validateLoginInput({ email: "", password: "" })); //ok
// // //-------------------------------------

// // //-----Must correct
// // //-------------------------------------

