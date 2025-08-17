const {calculateLoanDetails} = import ('../utils/services/loanService.js');

export function calculateLoan(req,res){
    //extract input, call utility function, return result
    const result = calculateLoanDetails(req.body);
    res.json(result);
};