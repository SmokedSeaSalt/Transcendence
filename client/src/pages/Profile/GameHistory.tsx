import MyStats from "./MyStats";
import PlayerList from "./PlayerList";
import type { jsonGameHistory } from "./getGameHistory";

export default function GameHistory({
	gameHistory,
}: { gameHistory: jsonGameHistory | null }) {
	if (gameHistory === null) {
		return <></>;
	}

	const gameHistoryClass = " bg-blue-800 text-lg py-1";

	const gameHistoryList = [];

	for (let index = gameHistory.gameResults.length - 1; index >= 0; index -= 1) {
		gameHistoryList.push(
			<div className="grid grid-cols-2 bg-blue-600 m-3 rounded-md">
				<MyStats gameResults={gameHistory.gameResults[index]} />
				<PlayerList gameSession={gameHistory.gameResults[index].session} />
			</div>,
		);
	}

	return (
		<section>
			<div className={gameHistoryClass}>{gameHistoryList}</div>
		</section>
	);
}
