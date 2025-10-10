import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";
import {hasEmoji} from "../../utils/hasEmoji.js"
import { hasWhiteSpaces } from "../../utils/hasWhiteSpaces.js";
import {hasControlChars} from '../../utils/hasControlChars.js'

export function validatePasswordInput(password){
    //not null
    if (!password){ throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Password is missing');}
    //string type only
    if (typeof password !== 'string') throw new AppError(AuthErrors.INVALID_INPUT, 'Password must be a string');
    //length > 8 && length < 200
    if (password.length <=8 || password.length >= 200) throw new AppError(AuthErrors.INVALID_INPUT, 'Password must have between 8 and 200 characters')
    //no emojis
    if (hasEmoji(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'Input password must NOT have any emoji characters')
    //no white spaces
    if (hasWhiteSpaces(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'White spaces cannot be added to the input password')
    //no control characters
    if (hasControlChars(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'Password CANNOT have any control character!!!')
    return true;
}
