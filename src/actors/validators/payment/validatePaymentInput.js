import { PaymentErrors } from "../../../errors/paymentErrors.js";

export function validatePaymentInput(payment) {



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
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate allowed status values
  const validStatuses = ["pending", "paid", "failed"];
  if (!validStatuses.includes(payment.status)) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate allowed method values
  const validMethods = ["bank-transfer", "cash", "credit-card"];
  if (!validMethods.includes(payment.method)) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate amount is a non-negative number
  if (typeof payment.amount !== "number" || payment.amount < 0) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate currency format and allowed values
  if (typeof payment.currency !== "string" || payment.currency.trim() === "") {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  const validCurrencies = ["USD", "ARS", "EUR"];
  if (!validCurrencies.includes(payment.currency)) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

// Validate paidAt only allowed if status is 'paid'
if (payment.status !== "paid") {
  if (payment.paidAt instanceof Date || typeof payment.paidAt === "string") {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }
}


  // Validate status 'paid' must include valid paidAt
  if (payment.status === "paid") {
    if (payment.paidAt === null || payment.paidAt === undefined) {
      throw PaymentErrors.CREATE.INVALID_DATA;
    }

    const paid = new Date(payment.paidAt);
    if (!(paid instanceof Date) || isNaN(paid)) {
      throw PaymentErrors.CREATE.INVALID_DATA;
    }

    const now = new Date();
    if (paid > now) {
      throw PaymentErrors.CREATE.INVALID_DATA;
    }
  }

  // Validate reference length
  if (
    payment.reference &&
    typeof payment.reference === "string" &&
    payment.reference.length > 50
  ) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate notes length
  if (
    payment.notes &&
    typeof payment.notes === "string" &&
    payment.notes.length > 255
  ) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate dueDate is at least one month in the future
  const now = new Date();
  const minDueDate = new Date(now);
  minDueDate.setMonth(minDueDate.getMonth() + 1);

  const dueDate = new Date(payment.dueDate);
  if (dueDate < minDueDate) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // ✅ No need to reject paidAt before dueDate — early payments are valid
}
