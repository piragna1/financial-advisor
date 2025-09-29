import express from "express";
import { deleteUserController, listUsersController, updateUserController } from "../../controllers/userController.mjs";
import { authMiddleware } from "../../middlewares/authMiddleware.js";


const router = express.Router();


router.get("/", listUsersController);

router.put('/', authMiddleware,updateUserController);

router.delete("/:email", deleteUserController);


export default router;
