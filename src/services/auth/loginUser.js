import { findUserByEmail } from "../../repositories/userRepo";
import { generateToken } from "../../utils/token";
import { validateLoginInput } from "../../validators/validateLoginInput";

export async function loginUser({ email, password }) {
  validateLoginInput(email, password);
  const user = findUserByEmail(email);
  await verifyPassword(password, user.passwordHash);
  const token = generateToken({ userId: user.id });
  return { user, token };
}