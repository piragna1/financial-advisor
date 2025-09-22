import { createLoan } from "../actors/loan/createLoan.js";
import { simulateLoan } from "../actors/loan/simulateLoan.js";
import { AppError } from "../errors/AppError";
import { LoanErrors } from "../errors/loanErrors";
import {deleteLoan, getLoanById, getLoans, updateLoan} from '../repositories/loanRepository.js'
export async function simulateLoanController(req,res,next){
    try {
        const simulation = simulateLoan(req.body, req.financialProfile);
        res.status(200).json(simulation);
    } catch (error) {
        next(error)
    }
}

export async function createLoanController(req,res,next) {
    try {
        const loan = await createLoan(req.body, req.financialProfile);
        res.status(201).json(loan);
    } catch (error) {
        next(error);
    }
}

export async function getLoanByIdController(req,res,next) {
    try {
        const {id} = req.params;
        const loan = await getLoanById();

        if (!loan){
            throw new AppError(LoanErrors.FIND.NOT_FOUND);
        }
        
        res.status(200).json(loan);
    } catch (error) {
        next(error)
    }
}

export async function updateLoanByIdController(req,res,next) {
    try {
        const {id} =req.params;
        const updates = req.body;
        const updatedLoan = await updateLoan(id,updates);
        res.status(200).json(updatedLoan);
    } catch (error) {
        next(error)
    }
}

export async function deleteLoanController(req,res,next) {
    try {
        const {id} = req.params;
        const deletedLoan = await deleteLoan(id);
        res.status(200).json(deletedLoan);
    } catch (error) {
        next(error)
    }
    
}

export async function getLoansController(res,req,next) {
    try {
        const loans = getLoans();
        res.status(200).json(loans);
    } catch (error) {
        next(error)
    }
}