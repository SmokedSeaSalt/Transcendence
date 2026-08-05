import { useState } from "react";
import {
	getLeaderboardStats,
	type userForLeaderboard,
} from "./getLeaderboardStats";

// inspired by template: https://www.tailwindtap.com/components/table/interactive-table-with-sorting
export default function Leaderboard() {
	const [activeColumn, setActiveColumn] = useState(["max_wpm"]);
	const [sortedBestFirst, setSortedBestFirst] = useState(["max_wpm"]);
	const [sortedData, setSortedData] = useState<userForLeaderboard[] | null>(
		null,
	);
	const [bestFirst, setBestFirst] = useState<boolean>(true);

	const { leaderboardStats, loading } = getLeaderboardStats();
	if (leaderboardStats === null) return <div>No stats for leaderboard.</div>;
	const user_stats: userForLeaderboard[] = leaderboardStats.leaderboard;

	// TableKey type is created for passing which column to sort on
	type TableKey = keyof (typeof user_stats)[0];

	/** Sort data by column passed as variable. If already sorted, reverse. Column
	 * is set to 'active' so the arrow can be coloured black instead of grey for clarity.
	 */
	const sortByColumn = (column: TableKey) => {
		if (sortedBestFirst?.includes(column.toString())) {
			const sortData = user_stats
				.slice()
				.sort((a, b) => (a[column] > b[column] ? 1 : -1));
			setSortedData(sortData);
			setSortedBestFirst([]);
			setBestFirst(false);
		} else {
			const sortData = user_stats
				.slice()
				.sort((a, b) => (a[column] > b[column] ? -1 : 1));
			setSortedData(sortData);
			setSortedBestFirst([column.toString()]);
			setBestFirst(true);
		}
		setActiveColumn([column.toString()]);
	};

	/** Svg arrow icon and behaviour */
	const arrow = (sortBy: TableKey) => {
		return (
			<svg
				className={`w-4 h-4 cursor-pointer
					${activeColumn?.includes(sortBy) ? "text-black" : "text-gray-400 group-hover:text-black rotate-180"}
				${sortedBestFirst?.includes(sortBy) ? "rotate-180" : "rotate-0"} `}
				onClick={() => sortByColumn(sortBy)}
				onKeyDown={() => sortByColumn(sortBy)}
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="2"
					d="M19 14l-7 7m0 0l-7-7m7 7V3"
				/>
				<title>arrow image</title>
			</svg>
		);
	};

	const headStyle = "py-3 px-3 sm:text-base font-bold whitespace-nowrap group";
	/** Style for a table heading that should be sortable (so not name & rank) */
	const tableHeadWithSort = (sortBy: TableKey, title: string) => {
		return (
			<th className={headStyle}>
				<div className="flex items-center">
					{arrow(sortBy)}
					<span
						className="cursor-pointer pl-1"
						onClick={() => sortByColumn(sortBy)}
						onKeyDown={() => sortByColumn(sortBy)}
					>
						{title}
					</span>
				</div>
			</th>
		);
	};

	const contentStyle =
		"py-2 pl-4 font-normal text-base border-t whitespace-nowrap";
	/** On page load, data is taken directly from fetch. After, data is taken from
	 * the sorted version.
	 */
	const tableBody = (sortedExists: boolean) => {
		let dataToUse: userForLeaderboard[] | null;
		if (sortedExists) {
			dataToUse = sortedData;
		} else {
			dataToUse = user_stats;
		}

		return (
			<tbody>
				{dataToUse?.map((data, index) => (
					<tr key={index}>
						{bestFirst ? (
							<td className={contentStyle}>{index + 1}</td>
						) : (
							<td className={contentStyle}>{dataToUse.length - index}</td>
						)}
						<td className={contentStyle}>{data?.name}</td>
						<td className={contentStyle}>{Number(data?.max_wpm.toFixed(1))}</td>
						<td className={contentStyle}>{Number(data?.avg_wpm.toFixed(1))}</td>
						<td className={contentStyle}>{Number(data?.max_cpm.toFixed(1))}</td>
						<td className={contentStyle}>{Number(data?.avg_cpm.toFixed(1))}</td>
						<td className={contentStyle}>
							{Number(data?.max_accuracy * 100).toFixed(1)}%
						</td>
						<td className={contentStyle}>
							{Number(data?.avg_accuracy * 100).toFixed(1)}%
						</td>
					</tr>
				))}
				<tr>
					<td colSpan={8} className="border-t" />
				</tr>
			</tbody>
		);
	};

	return (
		<div className="h-full bg-white flex flex-col items-center justify-center">
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="w-95/100 px-2">
					<div className="w-full overflow-x-auto mt-2">
						<table className="table-auto overflow-auto w-full text-left">
							<thead className="bg-gray-200">
								<tr>
									<th className={headStyle}>
										<span className="pl-1">Rank</span>
									</th>
									<th className={headStyle}>
										<span className="pl-1">Name</span>
									</th>
									{tableHeadWithSort("max_wpm", "Max WPM")}
									{tableHeadWithSort("avg_wpm", "Average WPM")}
									{tableHeadWithSort("max_cpm", "Max CPM")}
									{tableHeadWithSort("avg_cpm", "Average CPM")}
									{tableHeadWithSort("max_accuracy", "Max accuracy")}
									{tableHeadWithSort("avg_accuracy", "Average accuracy")}
								</tr>
							</thead>
							{tableBody(sortedData !== null)}
						</table>
					</div>
				</div>
			)}
		</div>
	);
}
