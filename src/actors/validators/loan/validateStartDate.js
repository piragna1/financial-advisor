import {AppError} from '../../../errors/AppError.js'
import {loanErrors} from '../../../errors/loanErrors.js'

export function validateStartDate(startDate) {
    if (
        !(startDate instanceof Date) ||
        isNaN(startDate.getTime())
    )
        throw new AppError(loanErrors.VALIDATION.INVALID_START_DATE);
}