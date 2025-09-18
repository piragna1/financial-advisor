export const schedule = {
    id:String,
    loanId:String,
    plan: 'weekly'|'monthly'|'custom',
    startDate:Date,
    totalAmount:Number,
    currency:String,
    installments:Number,
    createdAt:Date,
    updatedAt:Date
}