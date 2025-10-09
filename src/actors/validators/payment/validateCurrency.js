import { PaymentErrors } from "../../../errors/paymentErrors";
import { AppError } from "../../../errors/appError";
export function validateCurrency(currency) {
  // Validate currency format and allowed values
  if (typeof currency !== "string" || currency.trim() === "") {
    throw new AppError(PaymentErrors.CURRENCY.INVALID);
  }
  const validCurrencies = ["USD", "ARS", "EUR"];
  if (!validCurrencies.includes(currency)) {
    throw new AppError(PaymentErrors.CURRENCY.INVALID);
  }
}
