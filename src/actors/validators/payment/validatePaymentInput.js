import { AppError } from "../../../errors/appError.js";
import { PaymentErrors } from "../../../errors/paymentErrors.js";
import { validateDueDate } from "./validateDueDate.js";

export function validatePaymentInput(payment, updating = false) {
  console.log("validatePaymentInput, payment:", payment);

  // Assign default dueDate if missing
  if (!payment.dueDate) {
    const defaultDueDate = new Date();
    defaultDueDate.setMonth(defaultDueDate.getMonth() + 1);
    payment.dueDate = defaultDueDate;
  }

  // Check for required fields
  if (
    !payment.id &&
    !payment.scheduleId &&
    payment.amount == null &&
    !payment.currency &&
    !payment.status &&
    !payment.method
  ) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
    console.log("throwing 0");
    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate allowed status values
  const validStatuses = ["pending", "paid", "failed"];
  if (!validStatuses.includes(payment.status)) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
    console.log("throwing 1");
    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate allowed method values
  const validMethods = ["bank-transfer", "cash", "credit-card"];
  if (!validMethods.includes(payment.method)) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
    console.log("throwing 2");

    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate amount is a non-negative number
  if (typeof payment.amount !== "number" || payment.amount < 0) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    console.log("throwing 3");
    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate currency format and allowed values
  if (typeof payment.currency !== "string" || payment.currency.trim() === "") {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    console.log("throwing 4");
    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  const validCurrencies = ["USD", "ARS", "EUR"];
  if (!validCurrencies.includes(payment.currency)) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

    console.log("throwing 5");
    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  // Validate paidAt only allowed if status is 'paid'
  if (payment.status !== "paid") {
    if (payment.paidAt instanceof Date || typeof payment.paidAt === "string") {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      console.log("throwing 6");
      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }
  }

  // Validate status 'paid' must include valid paidAt
  if (payment.status === "paid") {
    if (payment.paidAt === null || payment.paidAt === undefined) {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      console.log("throwing 7");
      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }

    const paid = new Date(payment.paidAt);
    if (!(paid instanceof Date) || isNaN(paid)) {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      console.log("throwing 8");
      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }

    const now = new Date();
  }

  if (typeof payment.reference !== "string" || !payment.reference)
    payment.reference = "";

  // Validate reference length
  if (payment.reference.length > 50) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_REFERENCE);
    console.log("throwing 9");
    throw new AppError(PaymentErrors.CREATE.INVALID_REFERENCE);
  }

  if (!payment.notes || typeof payment.notes !== 'string') payment.notes = '';

  // Validate notes length
  if (
    payment.notes.length > 255
  ) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_NOTES);

    console.log("throwing 10");
    throw new AppError(PaymentErrors.CREATE.INVALID_NOTES);
  }

  validateDueDate(payment, updating);
  // ✅ No need to reject paidAt before dueDate — early payments are valid
}
