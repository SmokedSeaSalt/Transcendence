import { useCallback, useEffect, useState } from "react";

export type leaderboardStats = {
	leaderboard: userForLeaderboard[];
};

export type userForLeaderboard = {
	name: string;
	max_wpm: number;
	max_cpm: number;
	max_accuracy: number;
	avg_wpm: number;
	avg_cpm: number;
	avg_accuracy: number;
};

// hook to return either leaderboardStats object or null if user is not logged in
export const getLeaderboardStats = () => {
	const [leaderboardStats, setLeaderboardStats] =
		useState<leaderboardStats | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch("/web/leaderboard");
			if (!response.ok) setLeaderboardStats(null);
			else {
				const jsonData = await response.json();
				setLeaderboardStats(jsonData);
			}
		} catch (error) {
			console.log(error, "error");
			setLeaderboardStats(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { leaderboardStats, loading };
};
