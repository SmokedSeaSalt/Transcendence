import { getLeaderboardStats } from "./getLeaderboardStats";

export default function Leaderboard() {
	const { leaderboardStats, loading } = getLeaderboardStats();
	
	if (leaderboardStats === null) return <div>No stats</div>;
		
	
	return (
		<table className="table-auto">
			<thead>
				<tr>
					<th>Rank</th>
					<th>Name</th>
					<th>Max WPM</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>Blah</td>
					<td>100</td>
				</tr>
			</tbody>
		</table>
	);
}
