import { AppError } from "../../../errors/appError.js";
import { PaymentErrors } from "../../../errors/paymentErrors.js";
import { isValidUUID } from "../../../tests/helpers/testHelpers.js";
import { validatePaymentInput } from "./validatePaymentInput.js";
export function validatePaymentUpdate(payment) {
  try {
    validatePaymentInput(payment, true);
  } catch (err) {
    throw err;
  }
}
