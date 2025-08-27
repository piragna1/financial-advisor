//userRetriever.js
import {findUserByEmail} from '../../repositories/userRepo.js'
export function userRetrieve(email){
    console.log('userRetriever.js -> userRetrieve()')
    return findUserByEmail(email);
}