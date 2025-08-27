//comparePasswords.js
import { hash } from "../../actors/utils/crypto/hashPassword.js";
export function comparePasswords(real,input){
    const hashed = hash(real);
    const hashed1 = hash(input);
    return hashed1 === hashed;
}