import { AppError } from "../errors/AppError.js"
import { LoanErrors } from "../errors/loanErrors.js"
import {generateLoanId} from '../actors/loan/generateLoanId.js'
import {mockLoans} from '../config/mock.loans.db.config.js'
import { Pool } from "pg"
import { pool } from "../db/pool.js"

export async function saveLoan(loanData){ 
    if(!loanData || typeof loanData !== 'object')
        throw new Error("Invalid loan data received")
    try {

        const query = `INSERT INTO loans(
            id,principal,term_years, interest_rate,currency,loan_type,saved_at
        )
        VALUES ($1, $2, $3, $4,$5,$6,$7)
        RETURNING *;
        `;

        const values = [
            loanData.id,
            loanData.principal,
            loanData.termYears,
            loanData.interestRate,
            loanData.currency,
            loanData.loanType,
            new Date()
        ]

        const result = await pool.query(query, values);

        return result.rows[0];
    } catch (error) {
        throw new AppError(LoanErrors.CREATION.FAILED_CREATION, error);
    }
}

export async function getLoanById(id){
    if (!id || typeof id !== 'string') throw new Error("Invalid loan id");

    const query = `
    SELECT * FROM loans
    WHERE id = $1 AND deleted_at IS NULL;
    `;
    const result = await pool.query(query,[id]);
  return result[0] || null;    
}

export async function updateLoan(id,updates) { 
    if (!id || typeof id !== 'string')
        throw new Error("Invalid loan id");
    if (!updates || typeof updates !== 'object')
        throw new Error("Invalid update values received");

    const fields = [];
    const values = [];
    let index=  1;
    for (const [key,value] of Object.entries(updates)){
        fields.push(`${key} = $${index}`);
        values.push(value);
        index++;
    }
    values.push(new Date());
    values.push(id);

    const query = `
    UPDATE loans
    SET ${fields.join(', ')}, updated_at = $${index}
    WHERE id = $${index+1} AND deleted_at IS NULL
    RETURNING *;
    `;

    const result = await pool.query(query,values);
    return result.rows[0] || null;


    return updatedLoan;
}

export async function deleteLoan(id) {//deletion requires implementation
    if (!id || typeof id !== 'string')
        throw new Error("Invalid loan id")


    const query = `
    UPDATE loans
    SET deleted_at = $1
    WHERE id = $2 AND deleted_at IS NULL
    RETURNING *;
    `;
    const result = await pool.query(query, [new Date(), id]);
    return result.rows[0] || null;
}

export async function getLoans() {
    const query = `
    SELECT * FROM loans
    WHERE deleted_at IS NULL
    ORDER BY saved_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
}