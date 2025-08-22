import express from 'express';
import { loginUserController } from '../controllers/authController.mjs';

const router = express.Router();

router.post('/login', loginUserController);

export default router;
