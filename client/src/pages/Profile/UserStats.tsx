import { getUserStats } from "./getUserStats";

export default function UserStats() {
	const { userStats, loading } = getUserStats();

	if (userStats === null) return <div>No stats</div>;

	const statClass = "m-2 p-2 bg-blue-100 rounded-md";
	return (
		<>
			{loading ? (
				<div className="p-2 m-3 w-20/100">Loading stats...</div>
			) : (
				<div className="p-2 m-3 w-20/100">
					<div className={statClass}>Games played: {userStats.total_games}</div>
					<div className={statClass}>Games won: {userStats.wins}</div>
					<div className={statClass}>
						Average wpm: {Number(userStats.average_wpm.toFixed(1))}
					</div>
					<div className={statClass}>Max wpm: {userStats.max_wpm} </div>
					<div className={statClass}>
						Average accuracy:{" "}
						{Number(userStats.average_accuracy * 100).toFixed(1)}%
					</div>
					<div className={statClass}>
						Max accuracy: {(userStats.max_accuracy * 100).toFixed(1)}%
					</div>
				</div>
			)}
		</>
	);
}
