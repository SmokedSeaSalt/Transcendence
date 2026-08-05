import { useCallback, useEffect, useState } from "react";

export type jsonUserStats = {
	max_wpm: number;
	max_cpm: number;
	max_accuracy: number;
	average_wpm: number;
	average_cpm: number;
	average_accuracy: number;
	wins: number;
	total_games: number;
};

// hook to return either userStats object or null if user is not logged in
export const getUserStats = () => {
	const [userStats, setUserStats] = useState<jsonUserStats | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch("/web/me/stats");
			if (!response.ok) setUserStats(null);
			else {
				const jsonData = await response.json();
				setUserStats(jsonData);
			}
		} catch (error) {
			console.log(error, "error");
			setUserStats(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { userStats, loading };
};
