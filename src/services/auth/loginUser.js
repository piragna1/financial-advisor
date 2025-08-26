import { generateToken } from "../../utils/token";
import {userRetrieve} from '../../actors/retrievers/userRetriever.js'
import {validateLoginInput} from '../../actors/validators/auth/validateLoginInput.js'
import {comparePasswords} from '../../actors/security/comparePasswords.js'
import {} from ''

export async function loginUser({ email, password }) {

  const valid = validateLoginInput(email, password);
  console.log(valid);

  const user = userRetrieve(email);
  console.log(user);


  const validPass = comparePasswords(user.passwordHash,password);
  console.log(validPass);


  const token = generateToken({ userId: user.id });
  console.log(token);


  console.log({user,token});

  return { user, token };
}