import { PaymentErrors } from "../../../errors/paymentErrors";
import { AppError } from "../../../errors/appError";
export function validateCurrency(currency, updating
){
    
      // Validate currency format and allowed values
      if (typeof currency !== "string" || currency.trim() === "") {
        if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
    
        console.log("throwing 4");
        throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
      }
    
      const validCurrencies = ["USD", "ARS", "EUR"];
      if (!validCurrencies.includes(currency)) {
        if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
    
        console.log("throwing 5");
        throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
      }
    
}