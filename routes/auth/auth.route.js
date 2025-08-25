import express from 'express';
import { loginUserController } from '../controllers/authController.mjs';

const router = express.Router();

router.use('/register', )
router.use('/login', loginUserController);


export default router;
