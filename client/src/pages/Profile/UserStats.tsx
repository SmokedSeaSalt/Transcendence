import { getUserStats } from "./getUserStats";

export default function UserStats() {
	const { userStats, loading } = getUserStats();

	if (userStats === null) return <></>;

	const statClass = "m-2 p-2 bg-blue-100 rounded-md";
	return (
		<>
			{loading ? (
				<div className="p-2 m-3 w-20/100">Loading stats...</div>
			) : (
				<div className="p-2 m-3 w-20/100">
					<div className={statClass}>Games played: {userStats.total_games}</div>
					<div className={statClass}>Games won: {userStats.wins}</div>
					<div className={statClass}>Average wpm: {userStats.average_wpm}</div>
					<div className={statClass}>Max wpm: {userStats.max_wpm} </div>
				</div>
			)}
		</>
	);
}
