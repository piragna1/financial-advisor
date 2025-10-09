import { PaymentErrors } from "../../../errors/paymentErrors";
import { AppError } from "../../../errors/appError";

// src/validators/paymentValidator.js
export function validateDueDate(dueDate) {
  const minDueDate = new Date();
  minDueDate.setDate(minDueDate.getDate() + 20);

  if (dueDate == null) {
    throw new AppError(PaymentErrors.DUE_DATE.INVALID);
  }

  let parsed;

  if (typeof dueDate === "string" || dueDate instanceof Date) {
    parsed = new Date(dueDate);
  } else {
    throw new AppError(PaymentErrors.DUE_DATE.INVALID);
  }

  if (isNaN(parsed.getTime()) || parsed < minDueDate) {
    throw new AppError(PaymentErrors.DUE_DATE.INVALID);
  }
}