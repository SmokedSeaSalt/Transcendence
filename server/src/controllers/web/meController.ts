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

export async function getGameHistory(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		if (!req.user) {
			return next(new UnauthorizedError("Unauthorized"));
		}

		const gameHistory = await userServices.getGameHistoryById(req.user.id);

		return res.status(200).json(gameHistory);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
}

export async function getGameStats(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		if (!req.user) {
			return next(new UnauthorizedError("Unauthorized"));
		}

		const gameStats = await userServices.getGameStatsById(req.user.id);

		return res.status(200).json(gameStats);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
}
