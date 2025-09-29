import express from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { getProfile, updateProfileController, createProfileController, getProfileByEmailController, deleteProfileController } from '../../controllers/profileController.mjs';

const router = express.Router();


router.post("/", (req, res, next) => {
  console.log("Profile route hit");
  next();
}, createProfileController);

router.get(`/`, authMiddleware, getProfile);


router.get("/email/:email", (req, res, next) => {
  console.log("GET /profiles/email/:email hit with:", req.params.email);
  next();
}, getProfileByEmailController);


router.put('/', authMiddleware, updateProfileController);

router.delete("/", deleteProfileController);




export default router;