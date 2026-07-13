import { Router } from "express";
import * as userController from "../../controllers/web/userControllers.js";
import {
	createUserValidation,
	loginUserValidation,
} from "../../validators/userValidators.js";

const router = Router();

router.post("/register", createUserValidation(), userController.createUser);
router.post("/login", loginUserValidation(), userController.loginUser);
router.post("/logout", userController.logoutUser);

export default router;
