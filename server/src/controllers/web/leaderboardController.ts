import type { NextFunction, Request, Response } from "express";
import * as leaderboardServices from "../../services/leaderboardServices.js";

export async function getLeaderboard(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const leadboard = await leaderboardServices.getAllUsersInOrderWpm();
		if (!leadboard) {
			return res.status(200).json({ leadboard: [] });
		}

		return res.status(200).json(leadboard);
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
}
