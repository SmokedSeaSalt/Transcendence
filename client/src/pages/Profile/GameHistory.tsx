import MyStats from "./MyStats";
import PlayerList from "./PlayerList";
import getGameHistory from "./getGameHistory";

export default function GameHistory() {
	const gameHistory = getGameHistory();

	if (gameHistory === null) {
		return <></>;
	}

	const gameHistoryClass = "grid grid-cols-2 bg-blue-800 text-lg";

	const gameHistoryList = [];
	console.log(
		`gameHistory.gameResults.length = ${gameHistory.gameResults.length}`,
	);
	for (let index = gameHistory.gameResults.length - 1; index >= 0; index -= 1) {
		gameHistoryList.push(
			<MyStats gameHistory={gameHistory} index={index} />,
			<PlayerList gameHistory={gameHistory} index={index} />,
		);
		console.log(`Appending for the ${index} time`);
	}

	return (
		<section>
			<div className={gameHistoryClass}>{gameHistoryList}</div>
		</section>
	);
}
