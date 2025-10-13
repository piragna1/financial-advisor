import { AppError } from "../../../errors/AppError";
import { LoanErrors } from "../../../errors/loanErrors";

export function validatePrincipal(principal){
    
  if (typeof principal !== "number" || isNaN(principal))
    throw new AppError(LoanErrors.VALIDATION.INVALID_PRINCIPAL);

}