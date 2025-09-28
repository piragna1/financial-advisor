import { createLoan } from "../actors/loan/createLoan.js";
import { simulateLoan } from "../actors/loan/simulateLoan.js";
import { AppError } from "../errors/AppError.js";
import { LoanErrors } from "../errors/loanErrors.js";
import {deleteLoan, getLoanById, getLoans, updateLoan} from '../repositories/loanRepository.js'
import { saveLoan } from "../repositories/loanRepository.js";
import { v4 } from "uuid";
import { validate as isUUID } from "uuid";

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


export async function saveLoanController(req, res, next) {

  try {
    const {
      financialProfileId,
      startDate,
      termYears,
      principal,
      interestRate,
      paymentFrequencyPerYear,
      compoundingFrequencyPerYear,
      gracePeriodMonths,
      balloonPayment,
      loanType,
      currency,
      savedAt
    } = req.body;

if (!isUUID(financialProfileId)) {
  throw new AppError("INVALID_UUID", "financialProfileId must be a valid UUID");
}
const parsedStartDate = new Date(startDate);
if (isNaN(parsedStartDate.getTime())) {
  throw new AppError("INVALID_DATE", "startDate is not a valid date");
}

const loanData = {
  id: v4(),
  financialProfileId,
  startDate: parsedStartDate,
  termYears,
  principal,
  interestRate,
  paymentFrequencyPerYear,
  compoundingFrequencyPerYear,
  gracePeriodMonths,
  balloonPayment,
  loanType,
  currency,
  savedAt: savedAt ? new Date(savedAt) : new Date()
};


console.log("startDate type:", typeof loanData.startDate);
console.log("startDate instanceof Date:", loanData.startDate instanceof Date);



    const result = await saveLoan(loanData);
    res.status(201).json({ message: "Loan saved", loan: result });
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


export async function deleteLoanController(req, res, next) {
  try {
    const { id } = req.body;

    if (!id || typeof id !== "string") {
      throw new AppError("INVALID_LOAN_ID", "Loan ID must be a valid string");
    }

    const deleted = await deleteLoan(id);

    if (!deleted) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json({ message: "Loan deleted", deleted });
  } catch (error) {
    next(error);
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