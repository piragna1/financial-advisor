export function validatePaidAt(paidAt, status) {
  // Validate paidAt only allowed if status is 'paid'
  if (payment.status !== "paid") {
    if (payment.paidAt instanceof Date || typeof payment.paidAt === "string") {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      console.log("throwing 6");
      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }
  }
  // Validate status 'paid' must include valid paidAt
  if (status === "paid") {
    if (paidAt === null || paidAt === undefined) {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      console.log("throwing 7");
      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }

    const paid = new Date(paidAt);
    if (!(paid instanceof Date) || isNaN(paid)) {
      if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);

      console.log("throwing 8");
      throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
    }
  }
}
