import { validateName } from "./validateName.js";
import {validateEmailInput} from './validateEmailInput.js'
import {validatePasswordInput} from './validatePasswordInput.js'

export function validateRegistrationInput({ name,lastName, email, password }) {
    const emailErrors = validateEmailInput(email);
    const passwordErrors = validatePasswordInput(password);
    const nameErrors = validateName(name);
    const lastNameErrors = validateName(lastName);
    return true;
}

//----------TEST CASES
// //✅ Valid Input
// console.log(
//   validateRegistrationInput({
//     name: "Gonzalo",
//     lastName: "Varela",
//     email: "gonzalo@example.com",
//     password: "securePass123"
//   })
// );
// → returns true

//❌ Missing Fields
try {
  
  validateRegistrationInput({});
} catch (error) {
  console.error(error)
}
// → throws Error with:
// {
//   name: ["Name is required"],
  //  lastName: ["Last name is required"],
  //  email: ["Email is required"],
  //  password: ["Password is required"]
// }


// // ❌ Invalid Email Format
// validateRegistrationInput({
//   name: "Gonzalo",
//   lastName: "Varela",
//   email: "gonzalo@.com",
//   password: "securePass123"
// });
// // → throws Error with: { email: ["Email format is invalid"] }

// //❌ Email Not a String
// validateRegistrationInput({
//   name: "Gonzalo",
//   lastName: "Varela",
//   email: 12345,
//   password: "securePass123"
// });
// // → throws Error with: { email: ["Email must be a string."] }


// //❌ Password Not a String
// validateRegistrationInput({
//   name: "Gonzalo",
//   lastName: "Varela",
//   email: "gonzalo@example.com",
//   password: 12345
// });
// // → throws Error with: { password: ["Password must be a string."] }


// //❌ Empty Strings
// validateRegistrationInput({
//   name: "",
//   lastName: "",
//   email: "",
//   password: ""
// });
// // → throws Error with:
// // {
// //   name: ["Name is required"],
//   //  lastName: ["Last name is required"],
//   //  email: ["Email format is invalid"],
//   //  password: ["Password must be a string"]
// // }


// //❌ Name Not a String
// validateRegistrationInput({
//   name: 123,
//   lastName: "Varela",
//   email: "gonzalo@example.com",
//   password: "securePass123"
// });
// // → throws Error with: { name: ["Name must be a string."] }


// //❌ Last Name Not a String

// validateRegistrationInput({
//   name: "Gonzalo",
//   lastName: 456,
//   email: "gonzalo@example.com",
//   password: "securePass123"
// });
// // → throws Error with: { lastName: ["Last name must be a string."] }



