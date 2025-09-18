export const schedule = {
    id:String,
    loanId:String,
    plan: 'weekly'|'monthly'|'custom',
    startDate:String,
    totalAmount:Number,
    currency:String,
    installments:Number,
    createdAt:String,
    updatedAt:String
}