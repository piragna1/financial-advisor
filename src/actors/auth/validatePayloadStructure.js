import { AppError } from "../../errors/AppError";
import { AuthErrors } from "../../errors/authErrors";

export function validatePayloadStructure(payload){
    if (!payload || typeof payload !== 'object'){
        throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
    }
    const {sub,iat, exp} = payload;

    if (!sub || typeof sub !== 'string') throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
    if (!iat || typeof iat !== 'number') throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);
    if (!exp || typeof exp !== 'number') throw new AppError(AuthErrors.TOKEN.INVALID_PAYLOAD);

    return true;

}