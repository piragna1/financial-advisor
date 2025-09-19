import { v4 } from "uuid";

export function buildPaymentEntity(data){
    if (!data.scheduleId)
        throw new Errror('Schedule input is missing')
    if (typeof data.amount !== 'number'||
        data.amount <= 0
    )
        throw new Error("Invalid amount received")
    if (!data.method) 
        throw new Error('Payment method is missing')
    
    
    return {
        id:v4(),
        scheduleId:data.scheduleId,
        dueDate:Date.now(),
        amount:data.amount,
        currency:data.currency || 'USD',
        status: (data.amount === 0) ? 'pending' : 'paid',
        paidAt: (data.amount === 0) ? Date.now() : undefined,
        method: data.method,
        reference: data.reference,
        notes:data.notes
    }
}