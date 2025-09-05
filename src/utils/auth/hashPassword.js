//hashPassword.js
import crypto from 'crypto';

export async function hashPassword(input,secret='secret'){
    return crypto.createHmac('sha256',secret).update(input).digest('hex');
}