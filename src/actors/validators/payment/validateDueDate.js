// src/validators/paymentValidator.js
export function validateDueDate(dueDate, updating = false) {
  const minDueDate = new Date();
  minDueDate.setDate(minDueDate.getDate() + 20);

  const parsed = new Date(dueDate);
  if (parsed < minDueDate) {
    const errorCode = updating
      ? PaymentErrors.UPDATE.INVALID_DATA
      : PaymentErrors.CREATE.INVALID_DATA;

    throw new AppError(errorCode, "dueDate must be at least 20 days ahead");
  }
}