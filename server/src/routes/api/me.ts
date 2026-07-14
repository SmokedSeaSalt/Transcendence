import { Router } from "express";
import * as meController from "../../controllers/api/meController.js"
import { apiRegistry } from "../../swagger/apiRegistry.js";
import { createUserValidation } from "../../validators/userValidators.js";
import {
	userResponseSchema,
	singleErrorSchema,
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

// router.put("/", meController.updateMyProfile);

// router.get("/games", meController.getMyGameHistory);

export default router;
