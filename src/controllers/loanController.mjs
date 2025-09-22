import { createLoan } from "../actors/loan/createLoan";
import { simulateLoan } from "../actors/loan/simulateLoan";
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