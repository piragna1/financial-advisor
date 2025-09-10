import { validateName } from "./validateName.js";
import { validateEmailInput } from "./validateEmailInput.js";
import { validatePasswordInput } from "./validatePasswordInput.js";
import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";

export function validateRegistrationInput({ name, lastName, email, password }) {
  const errors = {};
  try {
    const emailErrors = validateEmailInput(email);
  } catch (error) {
    errors.email = [error.details || error.code];
  }
  try {
    const passwordErrors = validatePasswordInput(password);
  } catch (error) {
    errors.password = [error.details || error.code];
  }
  try {
    const nameErrors = validateName(name);
  } catch (error) {
    errors.name = [error.details || error.code];
  }
  try {
    const lastNameErrors = validateName(lastName);
  } catch (error) {
    errors.lastName = [error.details || error.code];
  }
  if (Object.keys(errors).length > 0)
    throw new AppError(
      AuthErrors.INVALID_INPUT,
      "Registration input is invalild." +
        "\n" +
        "See:" +
        "\n" +
        (errors["email"] ? errors["email"] : "correct") +
        "\n" +
        (errors["password"] ? errors["password"] : "") +
        "\n" +
        (errors["name"] ? errors["name"] : "") +
        "\n" +
        (errors["lastName"] ? errors["lastName"] : "")
    );

  return true;
}

// ----------TEST CASES
//✅ Valid Input
console.log(
  validateRegistrationInput({
    name: "Gonzalo",
    lastName: "Varela",
    email: "gonzalo@example.com",
    password: "securePass123",
  })
);
// → returns true

//❌ Missing Fields
try {
  validateRegistrationInput({ name: 1, lastName: "23456789" });
} catch (error) {
  console.error(error);
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
// // → throws Error with: { email: ["Email must be a string."] }

// //❌ Password Not a String
// validateRegistrationInput({
//   name: "Gonzalo",
//   lastName: "Varela",
//   email: "gonzalo@example.com",
//   password: 12345,
// });
// // → throws Error with: { password: ["Password must be a string."] }

// //❌ Empty Strings
// validateRegistrationInput({
//   name: "",
//   lastName: "",
//   email: "",
//   password: "",
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
