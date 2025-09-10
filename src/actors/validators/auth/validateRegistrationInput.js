import { validateName } from "./validateName.js";
import { validateEmailInput } from "./validateEmailInput.js";
import { validatePasswordInput } from "./validatePasswordInput.js";
import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";

export function validateRegistrationInput(input) {
  const errors = {};

  if (!input) {
    throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Empty input received')
  }
  else{

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
        errors.password = [error.details || error.message];
      }
    }
  
    if (!input.name) {
      errors["name"] = "Name is required";
    } else {
      try {
        const nameErrors = validateName(input.name);
      } catch (error) {
        errors.name = [error.details || error.message];
      }
    }
  
    if (!input.lastName) {
      errors["lastName"] = "Last name is required";
    } else {
      try {
        const lastNameErrors = validateName(input.lastName);
      } catch (error) {
        errors.lastName = [error.details || error.message];
      }
    }
  
    if (Object.keys(errors).length > 0)
      throw new AppError(
        AuthErrors.INVALID_INPUT,
        `Registration input is invalild.
        See:
        ${(errors["email"] ? errors["email"] : "correct")}
        ${(errors["password"] ? errors["password"] : "correct")}
        ${(errors["name"] ? errors["name"] : "correct")}
        ${(errors["lastName"] ? errors["lastName"] : "correct")}`
      );
  }

  return true;

}

// ----------TEST CASES
// //✅ Valid Input
// console.log(
//   validateRegistrationInput({
//     name: "Gonzalo",
//     lastName: "Varela",
//     email: "gonzalo@example.com",
//     password: "securePass123",
//   })
// );
// // → returns true

// //❌ Missing Fields
// try {
//   validateRegistrationInput();
// } catch (error) {
//   console.error(error);
// }
// // → throws Error with:
// // {
// //   name: ["Name is required"],
// //  lastName: ["Last name is required"],
// //  email: ["Email is required"],
// //  password: ["Password is required"]
// // }

// // ❌ Invalid Email Format
// validateRegistrationInput({
//   name: "Gonzalo",
//   lastName: "Varela",
//   email: "gonzalo@.com",
//   password: "securePass123",
// });
// // → throws Error with: { email: ["Email format is invalid"] }

// //❌ Email Not a String
// validateRegistrationInput({
//   name: "Gonzalo",
//   lastName: "Varela",
//   email: 12345,
//   password: "securePass123",
// });
// // // → throws Error with: { email: ["Email must be a string."] }

//❌ Password Not a String
validateRegistrationInput({
  name: "Gonzalo",
  lastName: "Varela",
  email: "gonzalo@example.com",
  password: 12345,
});
// → throws Error with: { password: ["Password must be a string."] }

// //❌ Empty Strings
// validateRegistrationInput({
//   name: "correct",
//   lastName: "correct",
//   email: "correct",
//   password: "correct",
// });
// // → throws Error with:
// // {
// //   name: ["Name is required"],
// //  lastName: ["Last name is required"],
// //  email: ["Email format is invalid"],
// //  password: ["Password must be a string"]
// // }

// //❌ Name Not a String
// validateRegistrationInput({
//   name: 123,
//   lastName: "Varela",
//   email: "gonzalo@example.com",
//   password: "securePass123",
// });
// // → throws Error with: { name: ["Name must be a string."] }

// //❌ Last Name Not a String

// validateRegistrationInput({
//   name: "Gonzalo",
//   lastName: 456,
//   email: "gonzalo@example.com",
//   password: "securePass123",
// });
// // → throws Error with: { lastName: ["Last name must be a string."] }
