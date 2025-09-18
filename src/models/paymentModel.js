export const payment = {
    id:String,
    scheduleId:String,
    dueDate:Date,
    amount:Number,
    currency:String,
    status:'pending' | 'paid' | 'failed',
    paidAt:Date,
    method:'credit-card'|'bank-transfer'|'cash',
    reference:String,
    notes:String
}