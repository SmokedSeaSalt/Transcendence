import MyStats from "./MyStats";
import PlayerList from "./PlayerList";
import getGameHistory from "./getGameHistory";

export default function GameHistory() {
	const gameHistory = getGameHistory();

	if (gameHistory === null) {
		return <></>;
	}

	const gameHistoryClass = " bg-blue-800 text-lg py-1";

	const gameHistoryList = [];

	for (let index = gameHistory.gameResults.length - 1; index >= 0; index -= 1) {
		gameHistoryList.push(
			<div className="grid grid-cols-2 bg-blue-600 m-3 rounded-md">
				<MyStats gameHistory={gameHistory} index={index} />
				<PlayerList gameHistory={gameHistory} index={index} />
			</div>,
		);
	}

	return (
		<section>
			<div className={gameHistoryClass}>{gameHistoryList}</div>
		</section>
	);
}
