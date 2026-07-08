import { z } from "zod";

const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters")
	.max(64, "Password must be at most 64 characters")
	.regex(/[a-z]/, "Password must contain a lowercase letter")
	.regex(/[A-Z]/, "Password must contain an uppercase letter")
	.regex(/\d/, "Password must contain a digit")
	.regex(/[^A-Za-z\d]/, "Password must contain a special character");

export const createUserSchema = z.object({
	email: z.email("Invalid email address"),
	name: z.string().min(1).max(100),
	password: passwordSchema,
});

export const loginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(1, "Password cannot be empty"),
});
