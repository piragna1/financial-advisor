import express from 'express';
import { calculateLoan } from '../controllers/loanController.mjs';

const router = express.Router();

router.post('/calculate-loan', calculateLoan);

export default router;