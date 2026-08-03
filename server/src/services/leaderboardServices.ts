import { prisma } from "../db.js";
import { getUserByID } from "./userServices.js";

type userForLeaderboard = {
	name: string;
	max_wpm: number;
	max_cpm: number;
};

/** return all users (name & wpm only), ordered by wpm */
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
		const thisUser: userForLeaderboard = {
			name: user.name,
			max_wpm: largest.wpm,
			max_cpm: largest.cpm,
		};
		leaderboardStats.push(thisUser);
	}
	leaderboardStats.sort((a, b) => (a.max_wpm > b.max_cpm ? -1 : 1));
	return leaderboardStats;
};

export async function getGameStatsById(id: number) {
	const gameStats = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			gameResults: {
				select: {
					wpm: true,
					cpm: true,
					accuracy: true,
					placement: true,
				},
			},
		},
	});

	if (!gameStats) {
		return null;
	}
	if (gameStats.gameResults.length === 0) {
		return {
			max_wpm: 0,
			max_cpm: 0,
			max_accuracy: 0,
			average_wpm: 0,
			average_cpm: 0,
			average_accuracy: 0,
			wins: 0,
			total_games: 0,
		};
	}

	const stats = gameStats.gameResults;
	const length = stats.length;
	const totals = stats.reduce(
		(accumulator, result) => ({
			wpm: accumulator.wpm + result.wpm,
			cpm: accumulator.cpm + result.cpm,
			accuracy: accumulator.accuracy + result.accuracy,
		}),
		{ wpm: 0, cpm: 0, accuracy: 0 },
	);

	const average = {
		wpm: totals.wpm / length,
		cpm: totals.cpm / length,
		accuracy: totals.accuracy / length,
	};
	const largest = {
		wpm: Math.max(...stats.map((result) => result.wpm)),
		cpm: Math.max(...stats.map((result) => result.cpm)),
		accuracy: Math.max(...stats.map((result) => result.accuracy)),
	};
	const wins = stats.reduce(
		(accumulator, result) =>
			result.placement === 1 ? accumulator + 1 : accumulator,
		0,
	);

	return {
		max_wpm: largest.wpm,
		max_cpm: largest.cpm,
		max_accuracy: largest.accuracy,
		average_wpm: average.wpm,
		average_cpm: average.cpm,
		average_accuracy: average.accuracy,
		wins: wins,
		total_games: length,
	};
}
