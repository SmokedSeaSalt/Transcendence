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

export const loginUserValidation = () => [
	body("email").isEmail().normalizeEmail(),
	body("password")
		.isLength({ min: 8, max: 64 })
		.withMessage("Password must be between 8 and 64 characters long")
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
		.withMessage(
			"Password must contain one uppercase letter, one lowercase letter, one digit, and one special character",
		),
	validateRequest,
];
