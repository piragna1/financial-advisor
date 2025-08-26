import { userRetrieve } from "../../actors/retrievers/userRetriever.js";
import { validateLoginInput } from "../../actors/validators/auth/validateLoginInput.js";
import { comparePasswords } from "../../utils/auth/comparePasswords.js";
import { issueToken } from "../../utils/auth/tokenIssuer.js";

export async function loginUser({ email, password }) {
  const valid = validateLoginInput({email, password});
  if (!valid) throw {code:'INVALID_INPUT'} 
  console.log(valid);

  const user = await userRetrieve(email); 
  if (!user) throw { code: "USER_NOT_FOUND" };
  console.log(user);

  const validPass = comparePasswords(user.passwordHash, password);
  console.log(validPass);
  if (!validPass) throw {code: "INVALID_CREDENTIALS",};

  const token = await issueToken(user);
  console.log(token);
  console.log({ user, token });

  return { user, token, success: true };
}
