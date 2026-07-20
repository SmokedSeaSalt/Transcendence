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

export const emailSchema = z
	.email("Invalid email address")
	.refine(
		(email) => {
			const at = email.indexOf("@");
			return at !== -1 && at <= 64;
		},
		{
			message: "Email username must be at most 64 characters",
		},
	)
	.refine(
		(email) => {
			const at = email.indexOf("@");
			return at !== -1 && email.length - at - 1 <= 253;
		},
		{
			message: "Email domain must be at most 253 characters",
		},
	);

///////////////
// User signup/
///////////////
export const createUserSchema = z
	.object({
		email: emailSchema,
		name: z.string().min(1, "Name is required").max(100, "Name too long"),
		password: passwordSchema,
	})
	.strict()
	.openapi("CreateUser");

export const userResponseSchema = z
	.object({
		id: z.number(),
		name: z.string(),
		email: emailSchema,
		createdAt: z.iso.datetime(),
	})
	.strict()
	.openapi("CreateUserResponse");

export const zodValidationErrorSchema = z
	.object({
		errors: z.array(
			z.object({
				path: z.string(),
				message: z.string(),
			}),
		),
	})
	.strict()
	.openapi("ValidationError");

export const singleErrorSchema = z
	.object({
		error: z.string(),
	})
	.strict()
	.openapi("SingleErrorSchemaError");

//////////////
// User login/
//////////////
export const loginSchema = z
	.object({
		email: z.email("Invalid email address"),
		password: z.string().min(1, "Password cannot be empty"),
	})
	.strict();

/////////////////////
// PUT new user name/
/////////////////////
export const putNameSchema = z
	.object({
		name: z.string().min(1, "Name cannot be empty").max(100, "Name too long"),
	})
	.strict();

export const createUserValidation = () => zodValidate(createUserSchema);
export const loginUserValidation = () => zodValidate(loginSchema);
export const putNameValidation = () => zodValidate(putNameSchema);
