import { Router } from "express";
import * as userController from "../../controllers/web/userControllers.js";
import {
	createUserValidation,
	loginUserValidation,
} from "../../validators/userValidators.js";

const router = Router();

router.post("/register", createUserValidation(), userController.createUser);
router.post("/login", loginUserValidation(), userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/update-apikey", userController.updateApiKey);

export default router;
