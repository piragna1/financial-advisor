import {generateToken} from './token.js'
import {} from ''
//tokenIssuer.js
export function issueToken(user){
    //default value for secret and expiresInSeconds
    return generateToken(user.id);
}