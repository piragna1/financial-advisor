import {extractToken} from '../actors/utils/auth/extractToken.js'
import {tokenExists} from '../actors/utils/auth/tokenExists.js'
import { AppError } from '../errors/AppError.js';
import { TokenErrors } from '../errors/tokenError.js';
import { verifyToken } from '../utils/auth/verifyToken.js';

export function authMiddleware(res,req,next){
    if (!tokenExists(req)) {
        throw new AppError(TokenErrors.MISSING_TOKEN);
    }
    const token = extractToken(req);
    const valid = verifyToken(token);
    if(valid) next();
    else{
        throw new AppError(TokenErrors.INVALID_TOKEN);
    }
}