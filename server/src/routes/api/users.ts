import { Router } from "express";
import z from "zod";
import * as userController from "../../controllers/api/userControllers.js";
import { isValidIdFormat } from "../../middleware/apiAuthentication.js";
import { normalizeEmail } from "../../middleware/normalizeEmail.js";
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
	tags: ["Admin Api"],
	security: [{ ApiKeyAuth: [] }],

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
			description: "Bad Request",
			content: {
				"application/json": {
					schema: zodValidationErrorSchema,
				},
			},
		},

		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		403: {
			description: "Forbidden",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		409: {
			description: "Conflict. User already exists with this email.",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});
router.post(
	"/register",
	normalizeEmail,
	createUserValidation(),
	userController.createUser,
);

apiRegistry.registerPath({
	method: "get",
	path: "/api/users",
	tags: ["Admin Api"],
	security: [{ ApiKeyAuth: [] }],

	request: {},
	responses: {
		200: {
			description: "List of Users returned",
			content: {
				"application/json": {
					schema: z.array(userResponseSchema),
				},
			},
		},

		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		403: {
			description: "Forbidden",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});
router.get("/", userController.getAllUsers);

apiRegistry.registerPath({
	method: "get",
	path: "/api/users/{id}",
	tags: ["Admin Api"],
	security: [{ ApiKeyAuth: [] }],

	request: {
		params: z.object({
			id: z.coerce.number().openapi({
				description: "The ID of the user",
				example: 123,
			}),
		}),
	},
	responses: {
		200: {
			description: "User returned",
			content: {
				"application/json": {
					schema: userResponseSchema,
				},
			},
		},

		400: {
			description: "{id} is not a number",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		403: {
			description: "Forbidden",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		404: {
			description: "Not Found",
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
	tags: ["Admin Api"],
	security: [{ ApiKeyAuth: [] }],

	request: {
		params: z.object({
			id: z.coerce.number().openapi({
				description: "The ID of the user",
				example: 123,
			}),
		}),
	},
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

		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		403: {
			description: "Forbidden",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		404: {
			description: "Not Found",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		409: {
			description: "Conflict. User is currently in game. Unable to delete user.",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});
router.delete("/:id", isValidIdFormat, userController.deleteUser);

apiRegistry.registerPath({
	method: "delete",
	path: "/api/users/{id}/api-key",
	tags: ["Admin Api"],
	security: [{ ApiKeyAuth: [] }],

	request: {
		params: z.object({
			id: z.coerce.number().openapi({
				description: "The ID of the user",
				example: 123,
			}),
		}),
	},
	responses: {
		204: { description: "Api-Key of the user deleted" },

		400: {
			description: "{id} is not a number",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		401: {
			description: "Unauthorized",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},


		403: {
			description: "Forbidden",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},

		404: {
			description: "Not Found",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});
router.delete("/:id/api-key", isValidIdFormat, userController.deleteUserApiKey);

export default router;
