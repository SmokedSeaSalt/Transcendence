import { Router } from "express";
import * as userController from "../../controllers/api/userControllers.js";
import { createUserValidation } from "../../validators/userValidators.js";
import { registry } from "../../swagger/registry.js";
import { createUserSchema,createUserResponseSchema, zodValidationErrorSchema, singleErrorSchema } from "../../validators/userValidators.js";

const router = Router();



registry.registerPath({
	method: "post",
	path: "/users/register",
	tags: ["Users"],

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
