import express from 'express';
import { updateFinancialProfileController } from '../../controllers/financialProfileController.mjs';
import { createFinancialProfileController } from "../../controllers/financialProfileController.mjs";
import {authMiddleware} from '../../middlewares/authMiddleware.js'

const router = express.Router();



router.post("/", createFinancialProfileController);


router.patch('/',authMiddleware, updateFinancialProfileController);

export default router;