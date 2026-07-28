import type { NextFunction, Request, Response } from "express";
import { toPublicUser } from "../../dto/user.mapper.js";
import { UnauthorizedError } from "../../errors/errorTypes.js";
import * as userServices from "../../services/userServices.js";

export const buildUserResponseFromSession = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return next(new UnauthorizedError("Unauthorized"));
		}

		const user = await userServices.getUserByID(req.user.id);
		if (!user) {
			return next(new UnauthorizedError("Unauthorized"));
		}

		const response = toPublicUser(user);

		return res.status(200).json(response);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};

export async function getGameResults(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		if (!req.user) {
			return next(new UnauthorizedError("Unauthorized"));
		}

		const gameResults = await userServices.getAllGameResultsById(req.user.id);

		return res.status(200).json(gameResults);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
}
