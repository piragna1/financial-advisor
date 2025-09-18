export const schedule = {
    id:String,
    userId:String,
    plan: 'weekly'|'monthly'|'custom',
    startDate:String,
    totalAmount:Number,
    currency:String,
    installments:Number,
    createdAt:String,
    updatedAt:String
}