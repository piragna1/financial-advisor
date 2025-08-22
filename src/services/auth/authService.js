const { validateRegistrationInput } = import(
  "../../validators/validateRegistrationInput.js"
);
const { validateLoginInput } = import("../../validators/validateLoginInput.js");
const { findUserByEmail, saveUser } = import("../../repositories/userRepo.js");
const bcrypt = import("bcrypt");
const { v4: uuidv4 } = import("uuid");
import { generateToken } from "../../utils/token.js";

export async function registerUser({ name, email, password }) {
  validateRegistrationInput({ name, email, password });

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error(
      "The email you have entered is not available at this moment"
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    passwordHash,
    createdAt: new Date(),
    isActive: true,
  };

  return await saveUser(newUser);
}

async function verifyPassword(password, userPasswordHash){
  const result = await bcrypt.compare(password, userPasswordHash);
  if (!result) throw new InvalidCredentialsError(); //custom
  return true;
}

export async function loginUser({ email, password }) {
  await validateLoginInput(email, password);
  const user = await findUserByEmail(email);
  await verifyPassword(password, user.passwordHash);
  const token = generateToken({ userId: user.id }); 
  return {user,token};
}
