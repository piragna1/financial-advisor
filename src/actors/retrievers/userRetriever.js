//userRetriever.js
import {findUserByEmail} from '../../repositories/userRepo.js'
export async function userRetrieve(email){
    console.log('userRetriever.js -> userRetrieve()')
    return await findUserByEmail(email);
}