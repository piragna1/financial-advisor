export function validateReference(reference){
  if (typeof reference !== "string" || !reference)
    reference = "";

  // Validate reference length
  if (reference.length > 50) {
    if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_REFERENCE);
    console.log("throwing 9");
    throw new AppError(PaymentErrors.CREATE.INVALID_REFERENCE);
  }
}