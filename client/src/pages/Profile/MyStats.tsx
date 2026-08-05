import type { jsonGameResults } from "./getGameHistory";

export default function MyStats({
	gameResults,
}: { gameResults: jsonGameResults }) {
	const myStatsClass = "grid grid-cols-2 py-1 pr-2 content-center";
	const childMyStatsClass =
		"bg-surface m-1 p-2 rounded-md text-center text-text";

	return (
		<div className={myStatsClass}>
			<div className={childMyStatsClass}>
				Placement: {gameResults.placement}
			</div>
			<div className={childMyStatsClass}>
				Time:
				{gameResults.timeMs === -1
					? " DNF"
					: ` ${(gameResults.timeMs / 1000).toFixed(2)} sec`}
			</div>
			<div className={childMyStatsClass}>
				Words per minute: {gameResults.wpm}
			</div>
			<div className={childMyStatsClass}>
				Characters per minute: {gameResults.cpm}
			</div>
			<div className="col-span-2">
				<div className={childMyStatsClass}>
					Date:{" "}
					{new Date(gameResults.session.finishedAt).toLocaleString("en-NL")}
				</div>
			</div>
		</div>
	);
}
