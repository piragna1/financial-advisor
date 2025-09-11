import { jwtConfig } from '../../config/jwtConfig.js';
import { AppError } from '../../errors/AppError.js';
import { AuthErrors } from '../../errors/authErrors.js';
import {generateToken} from '../../utils/auth/token.js'
//tokenIssuer.js
export function issueToken(user){ //checked
    //default value for secret and expiresInSeconds
    if (!user || !user.id || !user.id.trim() === '')
        throw new AppError(AuthErrors.USER_NOT_FOUND, 'Missing user information');
    return generateToken(user.id, jwtConfig.SECRET_SALT, 3600);
}

// const testUsers = [
//   { id: "user1" },
//   { id: "admin" },
//   { id: "guest" },
//   { id: "user_äöü" },
//   { id: "user-with-hyphen" },
//   { id: "user.with.dot" },
//   { id: "user@domain.com" },
//   { id: "1234567890" },
//   { id: "user💥" },
//   { id: "" },
//   { id: null },
//   { id: undefined },
//   { id: "longUserId_" + "x".repeat(100) },
// ];

// for (const [index, user] of testUsers.entries()) {
//   try {
//     const token = issueToken(user);
//     console.log(`Test #${index + 1}:`, token);
//   } catch (error) {
//     console.error(`Test #${index + 1} failed:`, error.message);
//   }
// }
