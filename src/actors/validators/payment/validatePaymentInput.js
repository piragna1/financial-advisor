import { AppError } from "../../../errors/appError.js";
import { PaymentErrors } from "../../../errors/paymentErrors.js";

export function validatePaymentInput(payment, updating = false) {

  // Assign default dueDate if missing
  if (!payment.dueDate) {
    const defaultDueDate = new Date();
    defaultDueDate.setMonth(defaultDueDate.getMonth() + 1);
    payment.dueDate = defaultDueDate;
  }

  // Check for required fields
  if (
    !payment.id ||
    !payment.scheduleId ||
    payment.amount == null ||
    !payment.currency ||
    !payment.status ||
    !payment.method
  ) {

    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate allowed status values
  const validStatuses = ["pending", "paid", "failed"];
  if (!validStatuses.includes(payment.status)) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate allowed method values
  const validMethods = ["bank-transfer", "cash", "credit-card"];
  if (!validMethods.includes(payment.method)) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate amount is a non-negative number
  if (typeof payment.amount !== "number" || payment.amount < 0) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate currency format and allowed values
  if (typeof payment.currency !== "string" || payment.currency.trim() === "") {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  const validCurrencies = ["USD", "ARS", "EUR"];
  if (!validCurrencies.includes(payment.currency)) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate paidAt only allowed if status is 'paid'
  if (payment.status !== "paid") {
    if (payment.paidAt instanceof Date || typeof payment.paidAt === "string") {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }
  }

  // Validate status 'paid' must include valid paidAt
  if (payment.status === "paid") {
    if (payment.paidAt === null || payment.paidAt === undefined) {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }

    const paid = new Date(payment.paidAt);
    if (!(paid instanceof Date) || isNaN(paid)) {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }

    const now = new Date();
    
  }

  // Validate reference length
  if (
    payment.reference &&
    typeof payment.reference === "string" &&
    payment.reference.length > 50
  ) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate notes length
  if (
    payment.notes &&
    typeof payment.notes === "string" &&
    payment.notes.length > 255
  ) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate dueDate is at least one month in the future
  const now = new Date();
  const minDueDate = new Date(now);
  minDueDate.setDate(minDueDate.getDate() + 20);

  const dueDate = new Date(payment.dueDate);
  if (dueDate < minDueDate) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // ✅ No need to reject paidAt before dueDate — early payments are valid
}
