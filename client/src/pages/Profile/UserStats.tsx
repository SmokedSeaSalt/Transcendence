import { getUserStats } from "./getUserStats";

export default function UserStats() {
	const { userStats, loading } = getUserStats();

	if (userStats === null) return <div>No stats</div>;

	const statClass =
		"flex-1 m-2 py-3 bg-surface rounded-md content-evenly text-center";
	const rowClass = "flex flex-1";

	return (
		<>
			{loading ? (
				<div className="p-2 m-2">Loading stats...</div>
			) : (
				<div className="flex flex-col flex-1 p-2 m-2">
					<div className={rowClass}>
						<div className={statClass}>
							<p>Games played:</p>
							{userStats.total_games}
						</div>
						<div className={statClass}>
							<p>Games won:</p>
							{userStats.wins}
						</div>
					</div>

					<div className={rowClass}>
						<div className={statClass}>
							<p>Average WPM:</p>
							{Number(userStats.average_wpm.toFixed(1))}
						</div>
						<div className={statClass}>
							<p>Max WPM:</p>
							{userStats.max_wpm}
						</div>
					</div>

					<div className={rowClass}>
						<div className={statClass}>
							<p>Average accuracy:</p>
							{Number(userStats.average_accuracy * 100).toFixed(1)}%
						</div>
						<div className={statClass}>
							<p>Max accuracy:</p>
							{Number(userStats.max_accuracy * 100).toFixed(1)}%
						</div>
					</div>
				</div>
			)}
		</>
	);
}
