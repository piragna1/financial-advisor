import { findUserByEmail } from "../../repositories/userRepo";
import { saveUser } from "../../repositories/userRepo";

export function registerUser(input){
    const exists = findUserByEmail(input.email);
    if (exists){
        throw new Error('The email is not available.');
    }
    const user = saveUser(input);
    return true;
}