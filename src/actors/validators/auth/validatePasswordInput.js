import { AppError } from "../../../errors/AppError";
import { AuthErrors } from "../../../errors/authErrors";

export function validatePasswordInput(password){
    if (!password){ 
        throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Password is missing');
    }
    else{
        if (typeof password !== "string") {
            throw new AppError(AuthErrors.INVALID_INPUT, 'Password must be a string');
        }
        else if (password.length <= 3) throw new AppError(AuthErrors.INVALID_INPUT, 'Password must contain more than 3 characters');
        else if (password.length >=200) throw new AppError (AuthErrors.INVALID_INPUT, 'Password must be less than 200 characters');
    }
    return true;
}