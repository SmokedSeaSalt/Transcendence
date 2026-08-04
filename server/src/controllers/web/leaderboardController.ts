import type { NextFunction, Request, Response } from "express";
import * as leaderboardServices from "../../services/leaderboardServices.js";

export async function getLeaderboard(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const leaderboard = await leaderboardServices.getAllUsersInOrderWpm();
		if (!leaderboard) {
			return res.status(200).json({ leaderboard: [] });
		}

		return res.status(200).json({ leaderboard: leaderboard });
	} catch (error: unknown) {
		if (error instanceof Error) {
			next(error);
		} else {
			next(new Error(String(error)));
		}
	}
}
