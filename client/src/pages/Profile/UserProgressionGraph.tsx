import ArrayGraph from "./ArrayGraph";
import { type jsonGameHistory } from "./getGameHistory";

export default function UserProgressionGraph({
	gameHistory,
}: { gameHistory: jsonGameHistory | null }) {
	if (!gameHistory) return <div>No progression</div>;

	const gameHistoryList = gameHistory.gameResults;

	const data = gameHistoryList.map((gameResult, index) => ({
		index,
		wpm: gameResult.wpm,
		cpm: gameResult.cpm,
	}));

	return (
		<>
			<div className="p-2 m-3 w-20/100">
				<ArrayGraph data={data} />
			</div>
		</>
	);
}
