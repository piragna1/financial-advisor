import express from 'express';
import { createLoanController, simulateLoanController } from '../../controllers/loanController.mjs';

const router = express.Router();

router.post('/simulate-loan', simulateLoanController);
router.post('/create-loan', createLoanController);

export default router;