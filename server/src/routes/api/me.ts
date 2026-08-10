import { Router } from "express";
import * as meController from "../../controllers/api/meController.js";
import { apiRegistry } from "../../swagger/apiRegistry.js";
import {
	playerHistorySchema,
	playerStatsSchema,
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
	tags: ["User Api"],
	security: [{ ApiKeyAuth: [] }],

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
			description: "Unauthorized",
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
router.get("/", meController.getMyProfile);

apiRegistry.registerPath({
	method: "get",
	path: "/api/me/stats",
	tags: ["User Api"],
	security: [{ ApiKeyAuth: [] }],

	request: {},

	responses: {
		200: {
			description: "Game History returned",
			content: {
				"application/json": {
					schema: playerStatsSchema,
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
router.get("/stats", meController.getGameStats);

apiRegistry.registerPath({
	method: "get",
	path: "/api/me/gameHistory",
	tags: ["User Api"],
	security: [{ ApiKeyAuth: [] }],

	request: {},

	responses: {
		200: {
			description: "Game History returned",
			content: {
				"application/json": {
					schema: playerHistorySchema,
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
router.get("/gameHistory", meController.getGameHistory);

apiRegistry.registerPath({
	method: "put",
	path: "/api/me",
	tags: ["User Api"],
	security: [{ ApiKeyAuth: [] }],

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
			description: "Unauthorized",
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
router.put("/", putNameValidation(), meController.putName);

apiRegistry.registerPath({
	method: "delete",
	path: "/api/me",
	tags: ["User Api"],
	security: [{ ApiKeyAuth: [] }],

	request: {},

	responses: {
		204: { description: "User deleted" },

		401: {
			description: "Unauthorized",
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
router.delete("/", meController.deleteUser);

export default router;
