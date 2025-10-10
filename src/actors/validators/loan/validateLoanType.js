export function validateLoanType(loanType){
    const allowedLoanTypes = [
    "personal",
    "mortgage",
    "auto",
    "education",
    "business",
  ];
  //loanType is an allowed type and a string
  if (
    typeof loanData.loanType !== "string" ||
    !allowedLoanTypes.includes(loanData.loanType.toLowerCase())
  )
    throw new Error(`Unsupported loan type: ${loanData.loanType}`);
}