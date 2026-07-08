import { body } from "express-validator";
import { validateRequest } from "../middleware/validateRequest.js";

export const createUserValidation = () => [
	body("email").isEmail().normalizeEmail(),
	body("name").trim().isLength({ min: 1, max: 100 }),
	body("password")
		.isLength({ min: 8, max: 64 })
		.withMessage("Password must be between 8 and 64 characters long")
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
		.withMessage(
			"Password must contain one uppercase letter, one lowercase letter, one digit, and one special character",
		),
	validateRequest,
];

// todo make this use the shared/src/validators/schema.ts

// export const createUserValidation = () => [
// 	body("email").custom((value) => {
// 		const result = createUserSchema.pick({ email: true }).safeParse({ email: value });
// 		if (!result.success) {
// 			throw new Error(result.error.errors[0].message);
// 		}
// 	}),
// 	// ...rest
// ];
