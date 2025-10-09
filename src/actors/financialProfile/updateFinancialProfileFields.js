import { FinancialErrors } from "../../errors/financialProfileErrors";
import {AppError} from '../../errors/AppError.js';
export function updateFinancialProfileFields(profile,updates){
    const allowed = ['salary'];
    const sanitized = {};
    for (key of allowed){
        if (key in updates){
            sanitized[key] = updates[key];
        }
    };
    if (Object.keys(sanitized) === 0 )
        throw new AppError(FinancialErrors.UPDATE.NO_VALID_FIELDS);

    return {
        ...profile,
        ...sanitized,
        updatedAt:Date.now()
    };
};