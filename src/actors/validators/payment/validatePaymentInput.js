import { PaymentErrors } from "../../../errors/paymentErrors.js";


export function validatePaymentInput(payment) {
  // Check for required fields
  if (
    !payment.id ||
    !payment.scheduleId ||
    !payment.dueDate ||
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

  // Validate paidAt only exists if status is 'paid'
  if (payment.paidAt && payment.status !== "paid") {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate status 'paid' must include paidAt
  if (payment.status === "paid" && !payment.paidAt) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate reference length
  if (payment.reference && typeof payment.reference === "string" && payment.reference.length > 50) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate notes length
  if (payment.notes && typeof payment.notes === "string" && payment.notes.length > 255) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate dueDate is not in the past
  const now = new Date();
  if (payment.dueDate && new Date(payment.dueDate) < now) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }

  // Validate paidAt is not before dueDate
  if (payment.paidAt && payment.dueDate && new Date(payment.paidAt) < new Date(payment.dueDate)) {
    throw PaymentErrors.CREATE.INVALID_DATA;
  }
}
