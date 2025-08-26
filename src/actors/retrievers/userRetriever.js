//userRetriever.js
import {findUserByEmail} from '../../repositories/userRepo.js'
export function userRetrieve(email){
    return findUserByEmail(email);
}