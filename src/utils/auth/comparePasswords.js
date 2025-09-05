//comparePasswords.js
import { hashPassword } from './hashPassword.js';

export async function comparePasswordHashes(real,input,secret){

    console.log('comparePasswordHashes()')//debug

    return real === await hashPassword(input,secret); //semi pure (crypto import)
}