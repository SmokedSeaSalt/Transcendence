import { Router } from "express";
import * as userController from "../../controllers/web/userControllers.js";
import { webRegistry } from "../../swagger/webRegistry.js";
import {
	createUserValidation,
	loginUserValidation,
} from "../../validators/userValidators.js";
import {
	createUserSchema,
	singleErrorSchema,
	userResponseSchema,
	zodValidationErrorSchema,
} from "../../validators/userValidators.js";

const router = Router();

webRegistry.registerPath({
	method: "post",
	path: "/web/users/register",
	tags: ["Web"],
	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: createUserSchema,
				},
			},
		},
	},

	responses: {
		201: {
			description: "User created",
			content: {
				"application/json": {
					schema: userResponseSchema,
				},
			},
		},

		400: {
			description: "Validation error",
			content: {
				"application/json": {
					schema: zodValidationErrorSchema,
				},
			},
		},

		409: {
			description: "User already exists with this email.",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});

router.post("/register", createUserValidation(), userController.createUser);
router.post("/login", loginUserValidation(), userController.loginUser);
router.get("/logout", userController.logoutUser);
router.get("/me", userController.buildUserResponseFromSession);
router.get("/update-apikey", userController.updateApiKey);

export default router;
