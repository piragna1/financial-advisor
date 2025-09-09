import { AppError } from '../../../errors/AppError.js';
import { AuthErrors } from '../../../errors/authErrors.js';
import {isNotSymbol} from '../../utils/isNotSymbol.js'
export function validateName(name){
    if (!name){
        throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Name is missing')
    }
    else {
        if (name.length < 3 || name.length > 35 ) {
        throw new AppError(AuthErrors.INVALID_INPUT, 'Name is too short (or too long)');
        }
        else if (typeof name === 'number'){
        throw new AppError(AuthErrors.INVALID_INPUT, 'Name must be a string');
        }
        for (const char of name) {
            if (!isNaN(char)) {
                throw new AppError(AuthErrors.INVALID_INPUT, 'Name cannot contain numbers');
            }
            if (!isNotSymbol(char)){
                throw new AppError(AuthErrors.INVALID_INPUT, 'Name cannot contain symbols');
            }
        }
    }
    return true;
}