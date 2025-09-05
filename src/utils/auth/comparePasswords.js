//comparePasswords.js
import { hashPassword } from './hashPassword.js';

export async function comparePasswordHashes(real,input,secret){

    console.log('comparePasswordHashes()')//debug
    console.log('real password', real)
    console.log('input password', input)
    console.log('secret', secret)


    return real === await hashPassword(input,secret); //semi pure (crypto import)
}