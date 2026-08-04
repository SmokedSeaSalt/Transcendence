import { useCallback, useEffect, useState } from "react";

export type GameResult = {
	wpm: number;
	cpm: number;
};

type GameHistoryResponse = {
	gameResults: GameResult[];
};

// hook to return either gameHistory object or null if user is not logged in
export const getGameHistory = () => {
	const [gameHistory, setGameHistory] = useState<GameHistoryResponse | null>(
		null,
	);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch("/web/me/gameHistory");
			if (!response.ok) setGameHistory(null);
			else {
				const jsonData: GameHistoryResponse = await response.json();
				console.log("json data from /web/me/gameHistory: ", jsonData);
				setGameHistory(jsonData);
			}
		} catch (error) {
			console.log(error, "error");
			setGameHistory(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { gameHistory, loading };
};
