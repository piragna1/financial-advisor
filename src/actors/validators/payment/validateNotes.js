export function validateNotes(notes, updating = false) {
  if (notes == null) return; // allow null or undefined

  if (typeof notes !== "string") {
    const errorCode = updating
      ? PaymentErrors.UPDATE.INVALID_NOTES
      : PaymentErrors.CREATE.INVALID_NOTES;

    throw new AppError(errorCode, "Notes must be a string");
  }

  const trimmed = notes.trim();

  if (trimmed.length > 255) {
    const errorCode = updating
      ? PaymentErrors.UPDATE.INVALID_NOTES
      : PaymentErrors.CREATE.INVALID_NOTES;

    throw new AppError(errorCode, "Notes must not exceed 255 characters");
  }
}