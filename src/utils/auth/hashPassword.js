//hashPassword.js
import { createHmac } from 'crypto';

export function hashPassword(input,secret='secret'){
    return createHmac('sha256',secret).update(input).digest('hex');
}