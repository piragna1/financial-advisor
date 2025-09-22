import { AppError } from "../errors/AppError"
import { LoanErrors } from "../errors/loanErrors"
import {generateLoanId} from '../actors/loan/generateLoanId.js'

export async function saveLoan(loanData){
    if(!loanData || typeof loanData !== 'object')
        throw new Error("Invalid loan data received")
    try {
        const savedLoan = {
            ...loanData,
            id:loanData.id || generateLoanId()
        }
        //await db.instert or similar (real logic)
        return savedLoan;
    } catch (error) {
        throw new AppError(LoanErrors.CREATION.FAILED_CREATION, error);
    }
}