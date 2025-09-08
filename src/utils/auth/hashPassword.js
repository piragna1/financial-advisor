//hashPassword.js
import { createHmac } from 'crypto';

export function hashPassword(input,secret='secret'){
    console.log('hashPassword() ->{}')
    return createHmac('sha256',secret).update(input).digest('hex');
}