import { v4 } from "uuid"

export function buildScheduleEntity(data){
    if (!data.loanId) throw new Error("Loan id is missing")
    if (typeof data.totalAmount !== 'number' || data.totalAmount <= 0) throw new Error("Total amount is invalid")
    if (typeof data.installments !== 'number' || data.installments <=0) throw new Error("Installments amount is invalid")
    return {
        id : v4(),
        loanId:data.loanId,
        startDate: data.startDate || Date.now(),
        totalAmount:data.totalAmount,
        currency: data.currency || 'USD',
        installments:data.installments,
        createdAt: Date.now(),
        updatedAt: Date.now(),    
    }
}