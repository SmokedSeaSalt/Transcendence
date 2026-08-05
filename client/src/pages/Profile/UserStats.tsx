import { getUserStats } from "./getUserStats";

export default function UserStats() {
	const { userStats, loading } = getUserStats();

	if (userStats === null) return <div>No stats</div>;

	const statClass =
		"w-50/100 m-2 bg-blue-100 rounded-md content-evenly text-center";
	const rowClass = "flex w-100/100 h-30/100";
	return (
		<>
			{loading ? (
				<div className="p-2 m-2 w-30/100">Loading stats...</div>
			) : (
				<div className="p-2 m-2 w-40/100 min-h-100/100 content-evenly">
					<div className={rowClass}>
						<div className={statClass}>
							Games played:
							<br />
							{userStats.total_games}
						</div>
						<div className={statClass}>
							Games won:
							<br />
							{userStats.wins}
						</div>
					</div>
					<div className={rowClass}>
						<div className={statClass}>
							Average WPM:
							<br />
							{Number(userStats.average_wpm.toFixed(1))}
						</div>
						<div className={statClass}>
							Max WPM:
							<br />
							{userStats.max_wpm}{" "}
						</div>
					</div>
					<div className={rowClass}>
						<div className={statClass}>
							Average accuracy:
							<br />
							{Number(userStats.average_accuracy * 100).toFixed(1)}%
						</div>
						<div className={statClass}>
							Max accuracy:
							<br />
							{Number(userStats.max_accuracy * 100).toFixed(1)}%
						</div>
					</div>
				</div>
			)}
		</>
	);
}
