import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getProfile, updateProfileController, createProfileController } from '../../controllers/profileController.mjs';

const router = express.Router();


router.post("/", (req, res, next) => {
  console.log("Profile route hit");
  next();
}, createProfileController);




router.post("/", createProfileController);

router.get(`/`, authMiddleware, getProfile);

router.patch('/', authMiddleware, updateProfileController) //test

export default router;