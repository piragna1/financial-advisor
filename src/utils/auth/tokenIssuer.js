import { jwtConfig } from '../../config/jwtConfig.js';
import {generateToken} from '../../utils/auth/token.js'
//tokenIssuer.js
export function issueToken(user){
    //default value for secret and expiresInSeconds
    return generateToken(user.id, jwtConfig.SECRET_SALT, 3600);
}