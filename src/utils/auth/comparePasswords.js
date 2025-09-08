//comparePasswords.js
import { passwordSecret } from '../../config/passwordSecretConfig.js';
import { hashPassword } from './hashPassword.js';

export function comparePassword(real,input,secret){


    const hashed = hashPassword(input,secret); //semi pure (crypto import)

    console.log('hashPassword(input,passwordSecret.PASSWORD_SECRET)',hashPassword(input,passwordSecret.PASSWORD_SECRET))
    console.log('real',real)
    console.log('hashed',hashed)
    return real ===  hashed;
}