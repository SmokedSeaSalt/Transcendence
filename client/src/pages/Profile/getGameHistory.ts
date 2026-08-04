import { useCallback, useEffect, useState } from "react";

export type jsonGameHistory = {
	gameResults: jsonGameResults[];
};

export type jsonGameResults = {
	id: number;
	score: number;
	wpm: number;
	cpm: number;
	accuracy: number;
	timeMs: number;
	placement: number;
	finished: boolean;
	sessionId: number;
	userId: number;
	displayName: string;
	session: jsonSession;
};

export type jsonSession = {
	id: number;
	charCount: number;
	wordCount: number;
	textPrompt: string;
	startedAt: string;
	finishedAt: string;
	results: jsonResults[];
};

export type jsonResults = {
	wpm: number;
	cpm: number;
	accuracy: number;
	timeMs: number;
	placement: number;
	displayName: string;
};

export default function getGameHistory() {
	const [gameHistory, setGameHistory] = useState<jsonGameHistory | null>(null);

	const history = useCallback(async () => {
		const response = await fetch("/web/me/gameHistory");
		if (!response.ok) {
			setGameHistory(null);
		} else {
			const data = await response.json();
			setGameHistory(data);
		}
	}, []);

	useEffect(() => {
		history();
	}, [history]);

	return gameHistory;
}
