const express = import ('express');
import { registerUserController } from '../../src/controllers/authController.mjs';

export const router= express.Router();
router.post(('/register'),registerUserController);