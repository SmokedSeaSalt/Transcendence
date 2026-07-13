import { Router } from "express";
import * as userController from "../../controllers/web/userControllers.js";
import { createUserValidation } from "../../validators/userValidators.js";
import { webRegistry } from "../../swagger/webRegistry.js";
import { createUserSchema,createUserResponseSchema, zodValidationErrorSchema, singleErrorSchema } from "../../validators/userValidators.js";

const router = Router();

webRegistry.registerPath({
	method: "post",
	path: "/users/register",
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
					schema: createUserResponseSchema,
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
