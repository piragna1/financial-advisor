import { PaymentErrors } from "../../../errors/paymentErrors";
import { AppError } from "../../../errors/AppError";

export function validatePaymentMethod(method, updating){
    
      // Validate allowed method values
      const validMethods = ["bank-transfer", "cash", "credit-card"];
      if (!validMethods.includes(method)) {
        if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
        throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
      }
    
}