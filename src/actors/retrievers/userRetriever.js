//userRetriever.js
import {findUserByEmail} from '../../repositories/userRepo.js'
export async function userRetrieve(email){
    return await findUserByEmail(email);
}