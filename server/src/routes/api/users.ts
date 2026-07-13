import { Router } from "express";
import * as userController from "../../controllers/api/userControllers.js";
import { createUserValidation } from "../../validators/userValidators.js";
import { registry } from "../../swagger/registry.js";
import { createUserSchema } from "../../validators/userValidators.js";

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
		},
	},
});
router.post("/register", createUserValidation(), userController.createUser);

export default router;
