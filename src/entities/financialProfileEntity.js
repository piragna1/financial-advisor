import {v4} from 'uuid'

export function buildFinancialProfileEntity(data){
    if (!data.userId || !data.id) 
        throw new Error('Fin. profile or/and user id is/are missing');
    if(typeof salary !=='number' || salary <=0)
        throw new Error("Invalid salary data received");
    
    return {
        id:v4(),
        userId:data.userId,
        salary:data.salary
    }
}