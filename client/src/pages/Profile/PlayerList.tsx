import type { jsonGameHistory } from "./getGameHistory";

export default function PlayerList({
	gameHistory,
	index,
}: { gameHistory: jsonGameHistory; index: number }) {
	const playerListClass = "overflow-y-auto max-h-40 pl-2";
	const playerClass =
		"m-2 p-2 bg-red-300 grid grid-cols-2 outline-solid rounded-md";
	const playerTimeClass = "text-right pr-5";

	const playerLists = [];

	for (
		let jndex = 0;
		jndex < gameHistory.gameResults[index].session.results.length;
		jndex += 1
	) {
		playerLists.push(
			<div className={playerClass}>
				<div>
					{gameHistory.gameResults[index].session.results[jndex].placement}
					{". "}
					{
						gameHistory.gameResults[index].session.results[jndex].displayName
					}{" "}
				</div>
				<div className={playerTimeClass}>
					{gameHistory.gameResults[index].session.results[jndex].timeMs === -1
						? "DNF"
						: `${(gameHistory.gameResults[index].session.results[jndex].timeMs / 1000).toFixed(2)} sec`}
				</div>
			</div>,
		);
	}

	return <div className={playerListClass}>{playerLists}</div>;
}
