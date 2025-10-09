import { AppError } from "../../../errors/appError";
import { PaymentErrors } from "../../../errors/paymentErrors";

export function validatePaidAt(paidAt, status) {
  if (status !== "paid") {
    if (
      paidAt instanceof Date ||
      typeof paidAt === "string" ||
      typeof paidAt === "number"
    ) {
      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }
    return;
  }

  if (paidAt === null || paidAt === undefined) {
    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }

  const paid = new Date(paidAt);
  if (isNaN(paid.getTime())) {
    throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
  }
}