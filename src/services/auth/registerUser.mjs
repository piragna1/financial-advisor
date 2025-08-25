import { buildUserEntity } from "../../entities/userEntity.js";
import { findUserByEmail, saveUser } from "../../repositories/userRepo.js";
import { validateRegistrationInput } from "../../actors/validators/auth/validateRegistrationInput.js";
import {v4 as uuidv4} from 'uuid';
import {hash} from '../../actors/utils/crypto/hashPassword.js'

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
  const passwordHash = hash(password, 'secret');
  const newUser = buildUserEntity({id,name,lastName,email,passwordHash});
  saveUser(newUser);
  return {success:true, newUser};
}
