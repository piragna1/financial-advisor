import express from "express";
import { deleteUserController, listUsersController } from "../../controllers/userController.mjs";


const router = express.Router();

router.delete("/:email", deleteUserController);

router.get("/", listUsersController);

export default router;
