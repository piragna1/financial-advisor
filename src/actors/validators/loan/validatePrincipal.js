import { AppError } from "../../../errors/AppError";
import { loanErrors } from "../../../errors/loanErrors";

export function validatePrincipal(principal){
    
  if (typeof principal !== "number" || isNaN(principal))
    throw new AppError(loanErrors.VALIDATION.INVALID_PRINCIPAL);

}