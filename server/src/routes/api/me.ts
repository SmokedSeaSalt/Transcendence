import { Router } from "express";
import * as meController from "../../controllers/api/meController.js";
import { apiRegistry } from "../../swagger/apiRegistry.js";
import {
	putNameSchema,
	putNameValidation,
	zodValidationErrorSchema,
} from "../../validators/userValidators.js";
import {
	singleErrorSchema,
	userResponseSchema,
} from "../../validators/userValidators.js";

const router = Router();

apiRegistry.registerPath({
	method: "get",
	path: "/api/me",
	tags: ["Api"],

	request: {},

	responses: {
		200: {
			description: "Me returned",
			content: {
				"application/json": {
					schema: userResponseSchema,
				},
			},
		},

		401: {
			description: "Unauthorized error",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});
router.get("/", meController.getMyProfile);

apiRegistry.registerPath({
	method: "put",
	path: "/api/me",
	tags: ["Api"],

	request: {
		body: {
			required: true,
			content: {
				"application/json": {
					schema: putNameSchema,
				},
			},
		},
	},

	responses: {
		204: { description: "Name sucessfully put" },

		400: {
			description: "Bad request",
			content: {
				"application/json": {
					schema: zodValidationErrorSchema,
				},
			},
		},

		401: {
			description: "Unauthorized error",
			content: {
				"application/json": {
					schema: singleErrorSchema,
				},
			},
		},
	},
});
router.put("/", putNameValidation(), meController.putName);

apiRegistry.registerPath({
	method: "delete",
	path: "/api/me",
	tags: ["Api"],

	request: {},

	responses: {
		204: { description: "User deleted" },

		404: { description: "User not found" },
	},
});
router.delete("/", meController.deleteUser);

// router.put("/", meController.updateMyProfile);

// router.get("/games", meController.getMyGameHistory);

export default router;
