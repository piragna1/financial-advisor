import { validateName } from "./validateName";

export function validateRegistrationInput({ name,lastName, email, password }) {

    const emailErrors = validateEmailInput(email);
    const passwordErrors = validatePasswordInput(password);
    const nameErrors = validateName(name);
    const lastNameErrors = validateName(lastName);
    const errors = {email:emailErrors, password:passwordErrors, name:nameErrors, lastName:lastNameErrors};
    if (
      errors['email'].length==0 &&
      errors['password'].length==0 &&
      errors['name'].length==0 &&
      errors['password'].length==0 
    ) return true;
    else{
      throw new Error(errors);
    }
}
