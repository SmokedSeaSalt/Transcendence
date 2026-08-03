import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";


export default function Leaderboard() {
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
