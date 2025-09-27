import { AppError } from "../../../errors/appError.js";
import { PaymentErrors } from "../../../errors/paymentErrors.js";
import { isValidUUID } from "../../../tests/helpers/testHelpers.js";

export function validatePaymentId(id) {
  if (!id || !isValidUUID(id)) {
    throw new AppError(PaymentErrors.READ.INVALID_ID);
  }
}
