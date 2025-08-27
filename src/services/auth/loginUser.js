import { userRetrieve } from "../../actors/retrievers/userRetriever.js";
import { validateLoginInput } from "../../actors/validators/auth/validateLoginInput.js";
import { AppError } from "../../errors/AppError.js";
import { AuthErrors } from "../../errors/authErrors.js";
import { comparePasswords } from "../../utils/auth/comparePasswords.js";
import { issueToken } from "../../utils/auth/tokenIssuer.js";

export async function loginUser({ email, password }) {

  const valid = validateLoginInput({email, password});
  if (!valid.ok) throw new AppError(AuthErrors.INVALID_INPUT);

  const user = await userRetrieve(email);
  if (!user) throw new AppError(AuthErrors.USER_NOT_FOUND);

  const validPass = comparePasswords(user.passwordHash, password);
  if (!validPass) throw new AppError(AuthErrors.INVALID_CREDENTIALS);

  const token = await issueToken(user);

  return { user, token, success: true };
}
