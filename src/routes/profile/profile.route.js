import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getProfile } from '../../controllers/profileController.mjs';

const router = express.Router();

router.get(`/`, authMiddleware, getProfile);

export default router;