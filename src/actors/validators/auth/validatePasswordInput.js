import { AppError } from "../../../errors/AppError.js";
import { AuthErrors } from "../../../errors/authErrors.js";
import {hasEmoji} from "../../utils/hasEmoji.js"
import { hasWhiteSpaces } from "../../utils/hasWhiteSpaces.js";
import {hasControlChars} from '../../utils/hasControlChars.js'

export function validatePasswordInput(password){
    if (!password){ 
        throw new AppError(AuthErrors.MISSING_CREDENTIALS, 'Password is missing');
    }
    else {
      if (hasWhiteSpaces(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'Password can not have white spaces')
      else{
          if (typeof password !== "string") {
              throw new AppError(AuthErrors.INVALID_INPUT, 'Password must be a string');
          }
          else if (password.length <= 3) throw new AppError(AuthErrors.INVALID_INPUT, 'Password must contain more than 3 characters');
          else if (password.length >=200) throw new AppError (AuthErrors.INVALID_INPUT, 'Password must be less than 200 characters');
          else if (hasEmoji(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'The password cannot contain emojis')
          else if (hasControlChars(password)) throw new AppError(AuthErrors.INVALID_INPUT, 'There must not be any control characters in password')
      }
    }
    return true;
}