import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getProfile, updateProfileController } from '../../controllers/profileController.mjs';

const router = express.Router();

router.get(`/`, authMiddleware, getProfile);

router.patch('/', authMiddleware, updateProfileController) //test

export default router;