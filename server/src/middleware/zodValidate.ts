import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

// This is a middleware factory that takes a zod schema.
export const zodValidate =
	<T extends ZodType>(schema: T) =>
	(req: Request, res: Response, next: NextFunction) => {
		const parsed = schema.safeParse(req.body);
		if (!parsed.success) {
			return res.status(400).json({
				errors: parsed.error.issues.map((e) => ({
					path: e.path.join("."),
					message: e.message,
				})),
			});
		}
		req.body = parsed.data;
		next();
	};