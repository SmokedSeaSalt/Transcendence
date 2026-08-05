import { prisma } from "../db.js";
import { getUserByID } from "./userServices.js";

type userForLeaderboard = {
	name: string;
	max_wpm: number;
	max_cpm: number;
	max_accuracy: number;
	avg_wpm: number;
	avg_cpm: number;
	avg_accuracy: number;
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
					accuracy: true,
				},
			},
		},
	});
	if (!userStats) return null;

	const leaderboardStats: Array<userForLeaderboard> = [];

	for (const user of userStats) {
		const stats = user.gameResults;
		const length = stats.length;
		if (length === 0) {
			const thisUser: userForLeaderboard = {
				name: user.name,
				max_wpm: 0,
				max_cpm: 0,
				max_accuracy: 0,
				avg_cpm: 0,
				avg_wpm: 0,
				avg_accuracy: 0,
			};
			leaderboardStats.push(thisUser);
			continue;
		}
		const largest = {
			wpm: Math.max(...stats.map((result) => result.wpm)),
			cpm: Math.max(...stats.map((result) => result.cpm)),
			accuracy: Math.max(...stats.map((result) => result.accuracy)),
		};
		const totals = stats.reduce(
			(accumulator, result) => ({
				wpm: accumulator.wpm + result.wpm,
				cpm: accumulator.cpm + result.cpm,
				accuracy: accumulator.accuracy + result.accuracy,
			}),
			{ wpm: 0, cpm: 0, accuracy: 0 },
		);
		const averages = {
			wpm: totals.wpm / length,
			cpm: totals.cpm / length,
			accuracy: totals.accuracy / length,
		};
		const thisUser: userForLeaderboard = {
			name: user.name,
			max_wpm: largest.wpm,
			max_cpm: largest.cpm,
			max_accuracy: largest.accuracy,
			avg_cpm: averages.cpm,
			avg_wpm: averages.wpm,
			avg_accuracy: averages.accuracy,
		};
		leaderboardStats.push(thisUser);
	}
	leaderboardStats.sort((a, b) => (a.max_wpm > b.max_wpm ? -1 : 1));
	return leaderboardStats;
};
