//comparePasswords.js
import { hash } from "../../actors/utils/crypto/hashPassword.js";
export function comparePasswords(real,input){
    const hashed = hash(input);
    return real === hashed;
}