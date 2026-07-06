import { Router } from "express";
import * as userController from "../../controllers/api/userControllers.js";
import { createUserValidation } from "../../validators/userValidators.js";

const router = Router();

router.post("/register", createUserValidation(), userController.createUser);

export default router;
