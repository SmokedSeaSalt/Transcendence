import { prisma } from "../db.js";
import { getUserByID } from "./userServices.js";

type userForLeaderboard = {
	name: string;
	max_wpm: number;
	max_cpm: number;
	avg_wpm: number;
	avg_cpm: number;
};

/** return all users (name & wpm & cpm only), sorted by max wpm */
export const getAllUsersInOrderWpm = async () => {
	const userStats = await prisma.user.findMany({
		select: {
			name: true,
			gameResults: {
				select: {
					wpm: true,
					cpm: true,
				},
			},
		},
	});
	if (!userStats) return null;

	const leaderboardStats: Array<userForLeaderboard> = [];

	for (const user of userStats) {
		const stats = user.gameResults;
		const largest = {
			wpm: Math.max(...stats.map((result) => result.wpm)),
			cpm: Math.max(...stats.map((result) => result.cpm)),
		};
		const totals = stats.reduce(
			(accumulator, result) => ({
				wpm: accumulator.wpm + result.wpm,
				cpm: accumulator.cpm + result.cpm,
			}),
			{ wpm: 0, cpm: 0 },
		);
		const length = stats.length;
		const averages = {
			wpm: totals.wpm / length,
			cpm: totals.cpm / length,
		};
		const thisUser: userForLeaderboard = {
			name: user.name,
			max_wpm: largest.wpm,
			max_cpm: largest.cpm,
			avg_cpm: averages.cpm,
			avg_wpm: averages.wpm,
		};
		leaderboardStats.push(thisUser);
	}
	leaderboardStats.sort((a, b) => (a.max_wpm > b.max_wpm ? -1 : 1));
	return leaderboardStats;
};
