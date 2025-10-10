import {v4} from 'uuid'
import {AppError} from '../errors/AppError.js'
import { FinancialErrors } from '../errors/financialProfileErrors.js';

export function buildFinancialProfileEntity(data){
    if (!data.id)throw new AppError(FinancialErrors.CREATE.INVALID_ID);
    if (!data.userId) throw new AppError(FinancialErrors.CREATE.INVALID_USER_ID);
    if(typeof data.salary !=='number' || data.salary <=0)
        throw new AppError(FinancialErrors.CREATE.INVALID_SALARY);
    
    return {
        id:v4(),
        userId:data.userId,
        salary:data.salary
    }
}