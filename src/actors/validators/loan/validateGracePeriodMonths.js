import {AppError} from '../../../errors/AppError.js'
import { loanErrors, LoanErrors } from '../../../errors/LoanErrors.js';
export function validateGracePeriodMonths(gracePeriodMonths){
  if (typeof gracePeriodMonths !== 'number' || isNaN(gracePeriodMonths))
    throw new AppError(loanErrors.GRACE_PERIOD_MONTHS.NOT_A_NUMBER);
    if (gracePeriodMonths < 0)
    throw new AppError(loanErrors.GRACE_PERIOD_MONTHS.NEGATIVE);
}