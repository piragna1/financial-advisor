export const payment = {
    id:String,
    scheduleId:String,
    dueDate:String,
    amount:Number,
    currency:String,
    status:'pending' | 'paid' | 'failed',
    paidAt:String,
    method:'credit-card'|'bank-transfer'|'cash',
    reference:String,
    notes:String
}