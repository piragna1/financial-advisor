import {validateLoanInput} from '../../actors/validators/loan/validateLoanInput.js'
import { AppError } from '../../errors/AppError.js';
import { LoanErrors } from '../../errors/loanErrors.js';
import { simulateLoan } from './simulateLoan.js';
export async function createLoan(input, financialProfileId){
    validateLoanInput(input);
    const simulation = simulateLoan(input,financialProfileId);
    if(!simulation.affordable){
        throw new AppError(LoanErrors.SIMULATION.INSUFFICIENT_CAPACITY);
    }
    const loanToSave = {
        ...input,
        simulation,
        createdAt:Date.now()
    };
    await loanRepository.saveLoan(loanToSave);
    return loanToSave;
}