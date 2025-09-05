//comparePasswords.js
import { hashPassword } from './hashPassword.js';

export function comparePasswordHashes(real,input,secret){
    return real === hashPassword(input,secret); //semi pure (crypto import)
}