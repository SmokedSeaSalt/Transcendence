import type { jsonGameHistory } from "./getGameHistory";

export default function MyStats({
	gameHistory,
	index,
}: { gameHistory: jsonGameHistory; index: number }) {
	const myStatsClass = "grid grid-cols-2 py-4 pr-2 content-center";
	const childMyStatsClass =
		"bg-red-300 m-1 p-4 outline-solid rounded-md text-center";

	return (
		<div className={myStatsClass}>
			<div className={childMyStatsClass}>
				Placement: {gameHistory.gameResults[index].placement}
			</div>
			<div className={childMyStatsClass}>
				Time:
				{gameHistory.gameResults[index].timeMs === -1
					? " DNF"
					: ` ${(gameHistory.gameResults[index].timeMs / 1000).toFixed(2)} sec`}
			</div>
			<div className={childMyStatsClass}>
				Words per minute: {gameHistory.gameResults[index].wpm}
			</div>
			<div className={childMyStatsClass}>
				Characters per minute: {gameHistory.gameResults[index].cpm}
			</div>
			<div className="col-span-2">
				<div className={childMyStatsClass}>
					Date:{" "}
					{new Date(
						gameHistory.gameResults[index].session.finishedAt,
					).toLocaleString("en-NL")}
				</div>
			</div>
		</div>
	);
}
