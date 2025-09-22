import express from 'express';
import { createLoanController, deleteLoanController, getLoanByIdController, getLoansController, simulateLoanController, updateLoanByIdController } from '../../controllers/loanController.mjs';

const router = express.Router();

router.post('/simulate-loan', simulateLoanController);
router.post('/create-loan', createLoanController);
router.get('/:id', getLoanByIdController);
router.put('/:id', updateLoanByIdController);
router.post('/', deleteLoanController);
router.delete('/:id', deleteLoanController);
router.get('/',getLoansController);
export default router;