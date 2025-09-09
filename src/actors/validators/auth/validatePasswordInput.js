import { AppError } from "../../../errors/AppError";
import { AuthErrors } from "../../../errors/authErrors";

export function validatePasswordInput(password){
    if (!password){ 
        throw new AppError(AuthErrors.MISSING_CREDENTIALS);
    }
    else{
        if (typeof password !== "string") {
            throw new AppError(AuthErrors.INVALID_INPUT);
        }
        else if (password.length <= 3) throw new AppError(AuthErrors.INVALID_INPUT);
    }
    return true;
}