import { AppError } from "../../../errors/appError";

export function validateStatus(status, updating){
    
      // Validate allowed status values
      const validStatuses = ["pending", "paid", "failed"];
      if (!validStatuses.includes(status)) {
        if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
        console.log("throwing 1");
        throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
      }
}