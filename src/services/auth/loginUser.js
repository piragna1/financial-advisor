import { userRetrieve } from "../../actors/retrievers/userRetriever.js";
import { validateLoginInput } from "../../actors/validators/auth/validateLoginInput.js";
import { passwordSecret } from "../../config/passwordSecretConfig.js";
import { AppError } from "../../errors/AppError.js";
import { AuthErrors } from "../../errors/authErrors.js";
import { comparePasswordHashes } from "../../utils/auth/comparePasswords.js";
import { issueToken } from "../../utils/auth/tokenIssuer.js";

export async function loginUser({ email, password }) {

  const valid = validateLoginInput({email, password});
  if (!valid.ok) throw new AppError(AuthErrors.INVALID_INPUT);

  const user = await userRetrieve(email);
  if (!user) throw new AppError(AuthErrors.USER_NOT_FOUND);

  const validPass = comparePasswordHashes(user.passwordHash, password,passwordSecret.PASSWORD_SECRET);
  if (!validPass) throw new AppError(AuthErrors.INVALID_CREDENTIALS);

  const token = await issueToken(user);

  return { user, token, success: true };
}
