import express from "express";
import { deleteUserController } from "../../controllers/userController.mjs";

const router = express.Router();

router.delete("/:email", deleteUserController);

export default router;
