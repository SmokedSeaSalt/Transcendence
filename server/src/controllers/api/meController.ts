import type { NextFunction, Request, Response } from "express";
import * as userServices from "../../services/userServices.js";
import { UnauthorizedError } from "../../errors/errorTypes.js";
import { userResponseSchema } from "../../validators/userValidators.js"

export const getMyProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return next(new UnauthorizedError('Invalid token'))
		}
		const { id, email, role } = req.user;
		const user = await userServices.getUserByID(id);

		// todo check if user can ever be null.
		const response = userResponseSchema.parse({
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt.toISOString(),
		});

		res.status(200).json(response);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};
