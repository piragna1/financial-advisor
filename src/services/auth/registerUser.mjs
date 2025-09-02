import { buildUserEntity } from "../../entities/userEntity.js";
import { findUserByEmail, saveUser } from "../../repositories/userRepo.js";
import { validateRegistrationInput } from "../../actors/validators/auth/validateRegistrationInput.js";
import {v4 as uuidv4, v4} from 'uuid';
import { hashPassword } from "../../utils/auth/hashPassword.js";
import { passwordSecret } from "../../config/passwordSecretConfig.js";

export async function registerUser({ name,lastName, email, password }) {
  const validation = validateRegistrationInput({
    name,
    lastName,
    email,
    password,
  });
  if (!validation.success) {
    throw new Error("Invalid input entered");
  }
  const exist = findUserByEmail(email);
  if (exist) {
    throw new Error("User already exists");
  }
  const id = uuidv4();
  const passwordHash = hashPassword(password, passwordSecret.PASSWORD_SECRET);
  const newUser = buildUserEntity({id,name,lastName,email,passwordHash});
  saveUser(newUser);
  return {success:true, newUser};
}
