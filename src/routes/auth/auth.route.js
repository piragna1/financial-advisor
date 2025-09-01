//auth.route.js
import express from 'express';
import { loginUserController } from '../../controllers/authController.mjs';
import { registerUserController } from '../../controllers/authController.mjs';

const router = express.Router();

router.post('/register', registerUserController)
router.post('/login', loginUserController);


export default router;
