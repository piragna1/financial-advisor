export function validatePaymentMethod(method){
    
      // Validate allowed method values
      const validMethods = ["bank-transfer", "cash", "credit-card"];
      if (!validMethods.includes(method)) {
        if (updating) throw new AppError(PaymentErrors.UPDATE.INVALID_DATA);
        console.log("throwing 2");
    
        throw new AppError(PaymentErrors.CREATE.INVALID_DATA);
      }
    
}