import type { jsonSession } from "./getGameHistory";

export default function PlayerList({
	gameSession,
}: { gameSession: jsonSession }) {
	const playerListClass = "overflow-y-auto max-h-40 pl-2 scrollbar-custom";
	const playerClass =
		"m-2 p-2 bg-surface grid grid-cols-2 rounded-md text-text";
	const playerTimeClass = "text-right pr-5 text-text";

	const playerLists = [];

	for (let index = 0; index < gameSession.results.length; index += 1) {
		playerLists.push(
			<div className={playerClass}>
				<div>
					{gameSession.results[index].placement}
					{". "}
					{gameSession.results[index].displayName}{" "}
				</div>
				<div className={playerTimeClass}>
					{gameSession.results[index].timeMs === -1
						? "DNF"
						: `${(gameSession.results[index].timeMs / 1000).toFixed(2)} sec`}
				</div>
			</div>,
		);
	}

	return <div className={playerListClass}>{playerLists}</div>;
}
