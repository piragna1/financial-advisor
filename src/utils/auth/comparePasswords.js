//comparePasswords.js
import { hash } from "../../actors/utils/crypto/hashPassword";
export function comparePasswords(real,input){
    const hashed = hash(input);
    return real === hashed;
}