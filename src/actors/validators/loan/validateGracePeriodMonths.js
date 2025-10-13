import {AppError} from '../../../errors/AppError.js'
import { LoanErrors } from '../../../errors/loanErrors.js';
export function validateGracePeriodMonths(gracePeriodMonths){
  if (typeof gracePeriodMonths !== 'number' || isNaN(gracePeriodMonths))
    throw new AppError(LoanErrors.GRACE_PERIOD_MONTHS.NOT_A_NUMBER);
    if (gracePeriodMonths < 0)
    throw new AppError(LoanErrors.GRACE_PERIOD_MONTHS.NEGATIVE);
}