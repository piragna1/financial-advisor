const express = import ('express');
import { registerUserController } from '../../src/controllers/authController.mjs';
const router= express.Router();
router.post(('/register'),registerUserController);
export default router;