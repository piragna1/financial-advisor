import {AppError} from '../../../errors/AppError.js'
import {LoanErrors} from '../../../errors/loanErrors.js'

export function validateStartDate(startDate) {
    if (
        !(startDate instanceof Date) ||
        isNaN(startDate.getTime())
    )
        throw new AppError(LoanErrors.VALIDATION.INVALID_START_DATE);
}