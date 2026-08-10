import type { NextFunction, Request, Response } from "express";
import { toPublicUser } from "../../dto/user.mapper.js";
import {
	NotFoundError,
	UnauthorizedError,
	UserCurrentlyInGameError,
} from "../../errors/errorTypes.js";
import { roomStore } from "../../services/roomStore.js";
import * as userServices from "../../services/userServices.js";

export const getMyProfile = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return next(new UnauthorizedError("Invalid token"));
		}
		const { id, email, role } = req.user;
		const user = await userServices.getUserByID(id);

		if (!user) {
			return next(new NotFoundError("User not found"));
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

export const putName = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return next(new UnauthorizedError("Invalid token"));
		}
		const { id } = req.user;
		const user = await userServices.setUserNameById(id, req.body.name);

		if (!user) {
			return next(new NotFoundError("User not found"));
		}

		return res.status(204).send();
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
};

export const deleteUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (!req.user) {
			return next(new UnauthorizedError("Invalid token"));
		}
		const { id } = req.user;
		if (roomStore.getUserRoom(id) !== undefined) {
			return next(
				new UserCurrentlyInGameError(
					"User is currently in a game lobby. User cannot be deleted.",
				),
			);
		}
		const count = await userServices.deleteUserById(id);

		if (count === 0) {
			return next(new NotFoundError("User not found"));
		}

		return res.status(204).send();
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
		if (!gameHistory) {
			return next(new NotFoundError("Not Found"));
		}

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
		if (!gameStats) {
			return next(new NotFoundError("Not Found"));
		}

		return res.status(200).json(gameStats);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
}
