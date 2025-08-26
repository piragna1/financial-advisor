//userRetriever.js
import {findUserByEmail} from '../../repositories/userRepo'
export function userRetrieve(email){
    return findUserByEmail(email);
}