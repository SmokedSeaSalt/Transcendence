import { Router } from "express";
import * as userController from "../../controllers/web/userControllers.js";
import { normalizeEmail } from "../../middleware/normalizeEmail.js";
import {
	createUserValidation,
	loginUserValidation,
} from "../../validators/userValidators.js";

const router = Router();

router.post(
	"/register",
	normalizeEmail,
	createUserValidation(),
	userController.createUser,
);
router.post(
	"/login",
	normalizeEmail,
	loginUserValidation(),
	userController.loginUser,
);
router.get("/logout", userController.logoutUser);
router.get("/update-apikey", userController.updateApiKey);

export default router;
