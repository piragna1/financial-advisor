//user.service.js
import { mockUsers } from "../../config/mock.db.config.js";
import { passwordSecret } from "../../config/passwordSecretConfig.js";
import { listUsers, saveUser } from "../../repositories/userRepo.js";
import { hashPassword } from "../../utils/auth/hashPassword.js";

export function persistUser(input){
   saveUser(input);
}

export function generateUser(name,lastName,email,password){
   const user = {
      id:listUsers.length,
      name,
      lastName,
      email,
      password: hashPassword('sha256', passwordSecret.PASSWORD_SECRET),
      createdAt: Date.now()
   };
   return user;
}