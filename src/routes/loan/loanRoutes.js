import express from 'express';
import { saveLoanController,createLoanController, deleteLoanController, getLoanByIdController, getLoansController, simulateLoanController, updateLoanByIdController } from '../../controllers/loanController.mjs';

const router = express.Router();

router.post('/simulate-loan', simulateLoanController);
router.post('/create-loan', createLoanController);




router.post("/", saveLoanController);

router.get('/:id', getLoanByIdController);
router.put('/:id', updateLoanByIdController);
router.post('/', deleteLoanController);
router.delete('/', deleteLoanController);
router.get('/',getLoansController);



export default router;