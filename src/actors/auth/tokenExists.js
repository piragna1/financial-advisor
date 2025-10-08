import { AppError } from '../../errors/AppError.js';
import { AuthErrors } from '../../errors/authErrors.js';
export function tokenExists(req) {
    const header = req?.headers?.authorization;
    if (typeof header !== 'string' ) {
        throw new AppError(AuthErrors.TOKEN.MISSING_TOKEN);
    }
    if ( header.trim()==='')  throw new AppError(AuthErrors.TOKEN.MISSING_TOKEN);
    return true;
}