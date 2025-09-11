//userRetriever.js
import {findUserByEmail} from '../../repositories/userRepo.js'
export async function userRetrieve(email){ //checked
    return await findUserByEmail(email);
}