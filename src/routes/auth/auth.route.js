//auth.route.js
import express from 'express';
import { loginUserController } from '../../controllers/authController.mjs';
import { registerUserController } from '../../controllers/authController.mjs';

const router = express.Router();

router.use('/register', registerUserController)
router.use('/login', loginUserController);


export default router;
