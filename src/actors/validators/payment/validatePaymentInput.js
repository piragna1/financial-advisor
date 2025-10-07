import { AppError } from "../../../errors/appError.js";
import { PaymentErrors } from "../../../errors/paymentErrors.js";
import { validateDueDate } from "./validateDueDate.js";
import { validateNotes } from "./validateNotes.js";
import { validateReference } from "./validateReference.js";
import { validateStatus } from "./validateStatus.js";
import{validatePaymentMethod} from './validatePaymentMethod.js'
import { validateCurrency } from "./validateCurrency.js";
import { validateAmount } from "./validateAmount.js";
import { validatePaidAt } from "./validatePaidAt.js";

export function validatePaymentInput(payment, updating = false) {
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
  validateStatus(payment.status, updating);
  validateDueDate(payment, updating);
  validatePaymentMethod(payment.method, updating);
  validateAmount(payment.amount, updating);
  validateCurrency(payment.currency, updating);
  validatePaidAt(payment.paidAt, payment.status, updating);  
  validateReference(payment.reference, updating);
  validateNotes(payment.notes, updating)
  // ✅ No need to reject paidAt before dueDate — early payments are valid
}
