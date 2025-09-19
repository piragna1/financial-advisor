import express from 'express';
import { updateFinancialProfileController } from '../../controllers/financialProfileController.mjs';
import {authMiddleware} from '../../middlewares/authMiddleware.js'

const router = express.Router();

router.patch('/',authMiddleware, updateFinancialProfileController);

export default router;