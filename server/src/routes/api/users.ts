import { Router } from "express";
import * as userController from "../../controllers/api/userControllers.js";
import { apiRegistry } from "../../swagger/apiRegistry.js";
import { createUserValidation } from "../../validators/userValidators.js";
import {
	createUserSchema,
	singleErrorSchema,
	userResponseSchema,
	zodValidationErrorSchema,
} from "../../validators/userValidators.js";

const router = Router();

apiRegistry.registerPath({
	method: "post",
	path: "/api/users/register",
	tags: ["Api"],

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

export default router;
