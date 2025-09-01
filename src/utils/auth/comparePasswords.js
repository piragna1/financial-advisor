//comparePasswords.js
import {v4 as uuidv4, v4} from 'uuid';
import { hashPassword } from './hashPassword.js';

export function comparePasswords(real,input,secret){
    return real === hashPassword(input,secret);
}