//user.service.js
import { saveUser } from "../../repositories/userRepo";

export function persistUser(input){
   saveUser(input);
}