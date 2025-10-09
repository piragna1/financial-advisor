import { AppError } from "../../../errors/appError";
import { PaymentErrors } from "../../../errors/paymentErrors";

export function validateNotes(notes) {
  if (notes == null) return; // allow null or undefined

  if (typeof notes !== "string") {
    throw new AppError(PaymentErrors.NOTES.NOT_A_STRING, "Notes must be a string");
  }
  const trimmed = notes.trim();

  if (trimmed.length > 255) {
    throw new AppError(PaymentErrors.NOTES.MAXIMUM_CAPACITY, "Notes must not exceed 255 characters");
  }
}