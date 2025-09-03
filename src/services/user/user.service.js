//user.service.js
import { passwordSecret } from "../../config/passwordSecretConfig.js";
import { listUsers, saveUser } from "../../repositories/userRepo.js";
import { hashPassword } from "../../utils/auth/hashPassword.js";

export function persistUser(input){
   saveUser(input);
}