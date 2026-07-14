import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";
import { zodValidationErrorSchema } from "../validators/userValidators.js";
// This is a middleware factory that takes a zod schema. the return is checked against zodValidationErrorSchema
export const zodValidate =
	<T extends ZodType>(schema: T) =>
	(req: Request, res: Response, next: NextFunction) => {
		const parsed = schema.safeParse(req.body);
		if (!parsed.success) {
			const errorBody = zodValidationErrorSchema.parse({
				errors: parsed.error.issues.map((e) => ({
					path: e.path.join("."),
					message: e.message,
				})),
			});

			return res.status(400).json(errorBody);
		}
		req.body = parsed.data;
		next();
	};
