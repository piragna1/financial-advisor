import { PaymentErrors } from "../../../errors/paymentErrors";
import { AppError } from "../../../errors/appError";

export function validateStatus(status){
    
      // Validate allowed status values
      const validStatuses = ["pending", "paid", "failed"];
      if (!validStatuses.includes(status)) {
        throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
      }
}