import { AppError } from "../../../errors/appError";
export function validateAmount(amount, updating){
    // Validate amount is a non-negative number
      if (typeof amount !== "number" || amount < 0) {
        if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
    
        console.log("throwing 3");
        throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
      }
}