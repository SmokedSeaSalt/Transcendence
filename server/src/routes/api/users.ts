import { Router } from "express";
import * as userController from "../../controllers/api/userControllers.js";
import { isValidIdFormat } from "../../middleware/apiAuthentication.js";
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

apiRegistry.registerPath({
	method: "get",
	path: "/api/users/{id}",
	tags: ["Api"],

	request: {},
	responses: {
		200: { description: "User returned" },

		400: {
			description: "{id} is not a number",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		404: {
			description: "User not found",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});
router.get("/:id", isValidIdFormat, userController.getUser);

apiRegistry.registerPath({
	method: "delete",
	path: "/api/users/{id}",
	tags: ["Api"],

	request: {},
	responses: {
		204: { description: "User deleted" },

		400: {
			description: "{id} is not a number",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		404: {
			description: "User not found",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});
router.delete("/:id", isValidIdFormat, userController.deleteUser);

export default router;
