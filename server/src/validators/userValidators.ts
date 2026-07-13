import { z } from "zod";
import { zodValidate } from "../middleware/zodValidate.js";

const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.max(64, "Password must be at most 64 characters")
	.regex(/[a-z]/, "Password must contain a lowercase letter")
	.regex(/[A-Z]/, "Password must contain an uppercase letter")
	.regex(/\d/, "Password must contain a digit")
	.regex(/[^A-Za-z\d]/, "Password must contain a special character");

const createUserSchema = z.object({
	email: z.email("Invalid email address"),
	name: z.string().min(1, "Name is required").max(100, "Name too long"),
	password: passwordSchema,
});

const loginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(1, "Password cannot be empty"),
});

export const createUserValidation = () => zodValidate(createUserSchema);
export const loginValidation = () => zodValidate(loginSchema);