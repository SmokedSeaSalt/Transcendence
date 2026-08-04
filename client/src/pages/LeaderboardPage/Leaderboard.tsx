import { useEffect, useMemo, useState } from "react";
import {
	getLeaderboardStats,
	type userForLeaderboard,
} from "./getLeaderboardStats";

export default function Leaderboard() {
	const [activeColumn, setActiveColumn] = useState(["max_wpm"]);
	const [sortingColumn, setSortingColumn] = useState(["max_wpm"]);
	const [sortingData, setSortingData] = useState<userForLeaderboard[] | null>(
		null,
	); // default should be userstats already :/

	const { leaderboardStats, loading } = getLeaderboardStats();
	if (leaderboardStats === null) return <div>No stats</div>;
	// const user_stats : userForLeaderboard[] = leaderboardStats.userStats;
	// console.log("User stats: ", user_stats);
	console.log("leaderboard stats: ", leaderboardStats);

	const user_stats = [
		{
			name: "3_augustus",
			max_wpm: 60,
			max_cpm: 486,
			avg_cpm: 369.77777777777777,
			avg_wpm: 43.22222222222222,
		},
		{ name: "Fake", max_wpm: 41, max_cpm: 381, avg_cpm: 381, avg_wpm: 41 },
		{
			name: "I am very important",
			max_wpm: 2,
			max_cpm: 3,
			avg_cpm: 3,
			avg_wpm: 2,
		},
		{ name: "a", max_wpm: 10, max_cpm: 3821, avg_cpm: 1381, avg_wpm: 414 },
		{ name: "b", max_wpm: 1, max_cpm: 33281, avg_cpm: 3831, avg_wpm: 411 },
		{ name: "c", max_wpm: 5, max_cpm: 3, avg_cpm: 3381, avg_wpm: 411 },
	];

	// useEffect(() => {
	// 	setSortingData(user_stats);
	// }, []);

	// useMemo(() => {
	// 	const sorted_stats = user_stats.slice().sort((a, b) => a.avg_wpm - b.avg_wpm);
	// 	setSortingData(sorted_stats);
	// }, []);

	type TableKey = keyof (typeof user_stats)[0];
	// sort by column passed as argument; if already sorted, reverse
	const sortByColumn = (column: TableKey) => {
		if (sortingColumn?.includes(column.toString())) {
			const sortData = user_stats
				.slice()
				.sort((a, b) => (a[column] > b[column] ? 1 : -1));
			setSortingData(sortData);
			setSortingColumn([]);
		} else {
			const sortData = user_stats
				.slice()
				.sort((a, b) => (a[column] > b[column] ? -1 : 1));
			setSortingData(sortData);
			setSortingColumn([column.toString()]);
		}
		setActiveColumn([column.toString()]);
	};

	const contentStyle =
		"py-2 px-3 font-normal text-base border-t whitespace-nowrap";

	// template: https://www.tailwindtap.com/components/table/interactive-table-with-sorting

	return (
		<div className="h-full bg-white flex flex-col items-center justify-center py-4 gap-12 text-black">
			<div className="w-95/100 px-2">
				<div className="w-full overflow-x-scroll md:overflow-auto max-w-7xl 2xl:max-w-none mt-2">
					<table className="table-auto overflow-auto w-full text-left">
						<thead className="bg-[#222E3A]/[6%] rounded-lg text-base font-semibold w-full">
							<tr className="">
								<th className="py-3 px-3 sm:text-base font-bold whitespace-nowrap group">
									<div className="flex items-center">
										<svg
											className={`w-4 h-4 cursor-pointer ${
												activeColumn?.includes("Rank")
													? "text-black"
													: "text-[#BCBDBE] group-hover:text-black rotate-180"
											} ${
												sortingColumn?.includes("Rank")
													? "rotate-180"
													: "rotate-0"
											}
           `}
											// onClick={() => sortByColumn("Rank")}
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 14l-7 7m0 0l-7-7m7 7V3"
											/>
										</svg>
										<span
											className="cursor-pointer pl-1"
											// onClick={() => sortByColumn("Rank")}
										>
											Rank
										</span>
									</div>
								</th>
								<th className="py-3 px-3 flex items-centersm:text-base font-bold whitespace-nowrap group">
									<svg
										className={`w-4 h-4 cursor-pointer ${
											activeColumn?.includes("Name")
												? "text-black"
												: "text-[#BCBDBE] group-hover:text-black rotate-180"
										} ${
											sortingColumn?.includes("Name")
												? "rotate-180"
												: "rotate-0"
										} `}
										onClick={() => sortByColumn("name")}
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 14l-7 7m0 0l-7-7m7 7V3"
										/>
									</svg>
									<span
										className="cursor-pointer pl-1"
										onClick={() => sortByColumn("name")}
									>
										Name
									</span>
								</th>
								<th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
									<div className="flex items-center">
										<svg
											className={`w-4 h-4 cursor-pointer ${
												activeColumn?.includes("max_wpm")
													? "text-black"
													: "text-[#BCBDBE] group-hover:text-black rotate-180"
											} ${
												sortingColumn?.includes("max_wpm")
													? "rotate-180"
													: "rotate-0"
											} `}
											onClick={() => sortByColumn("max_wpm")}
											onKeyDown={() => sortByColumn("max_wpm")}
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 14l-7 7m0 0l-7-7m7 7V3"
											/>
										</svg>
										<span
											className="cursor-pointer pl-1"
											onClick={() => sortByColumn("max_wpm")}
											onKeyDown={() => sortByColumn("max_wpm")}
										>
											max_wpm
										</span>
									</div>
								</th>
								<th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
									<svg
										className={`w-4 h-4 cursor-pointer  ${
											sortingColumn?.includes("avg_wpm")
												? "rotate-180"
												: "rotate-0"
										} ${
											activeColumn?.includes("avg_wpm")
												? "text-black"
												: "text-[#BCBDBE] group-hover:text-black rotate-180"
										}`}
										onClick={() => sortByColumn("avg_wpm")}
										onKeyDown={() => sortByColumn("avg_wpm")}
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M19 14l-7 7m0 0l-7-7m7 7V3"
										/>
									</svg>
									<span
										className="cursor-pointer pl-1"
										onClick={() => sortByColumn("avg_wpm")}
										onKeyDown={() => sortByColumn("avg_wpm")}
									>
										avg_wpm
									</span>
								</th>
								<th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
									<div className="flex items-center">
										<svg
											className={`w-4 h-4 cursor-pointer ${
												activeColumn?.includes("max_cpm")
													? "text-black"
													: "text-[#BCBDBE] group-hover:text-black rotate-180"
											} ${
												sortingColumn?.includes("max_cpm")
													? "rotate-180"
													: "rotate-0"
											} `}
											onClick={() => sortByColumn("max_cpm")}
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 14l-7 7m0 0l-7-7m7 7V3"
											/>
										</svg>
										<span
											className="cursor-pointer pl-1"
											onClick={() => sortByColumn("max_cpm")}
											onKeyDown={() => sortByColumn("max_cpm")}
										>
											max_cpm
										</span>
									</div>
								</th>
								<th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap group">
									<div className="flex items-center">
										<svg
											className={`w-4 h-4 cursor-pointer ${
												activeColumn?.includes("avg_cpm")
													? "text-black"
													: "text-[#BCBDBE] group-hover:text-black rotate-180"
											} ${
												sortingColumn?.includes("avg_cpm")
													? "rotate-180"
													: "rotate-0"
											} `}
											onClick={() => sortByColumn("avg_cpm")}
											onKeyDown={() => sortByColumn("avg_cpm")}
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 14l-7 7m0 0l-7-7m7 7V3"
											/>
										</svg>
										<span
											className="cursor-pointer pl-1"
											onClick={() => sortByColumn("avg_cpm")}
											onKeyDown={() => sortByColumn("avg_cpm")}
										>
											avg_cpm
										</span>
									</div>
								</th>
							</tr>
						</thead>
						{!sortingData ? (
							<tbody>
								{user_stats?.map((data, index) => (
									<tr key={index}>
										<td className={contentStyle}>?</td>
										<td className={contentStyle}>{data?.name}</td>
										<td className={contentStyle}>
											{Number(data?.max_wpm.toFixed(1))}
										</td>
										<td className={contentStyle}>
											{Number(data?.avg_wpm.toFixed(1))}
										</td>
										<td className={contentStyle}>
											{Number(data?.max_cpm.toFixed(1))}
										</td>
										<td className={contentStyle}>
											{Number(data?.avg_cpm.toFixed(1))}
										</td>
									</tr>
								))}
								<tr>
									<td colSpan={6} className="border-t" />
								</tr>
							</tbody>
						) : (
							<tbody>
								{sortingData?.map((data, index) => (
									<tr key={index}>
										<td className={contentStyle}>?</td>
										<td className={contentStyle}>{data?.name}</td>
										<td className={contentStyle}>
											{Number(data?.max_wpm.toFixed(1))}
										</td>
										<td className={contentStyle}>
											{Number(data?.avg_wpm.toFixed(1))}
										</td>
										<td className={contentStyle}>
											{Number(data?.max_cpm.toFixed(1))}
										</td>
										<td className={contentStyle}>
											{Number(data?.avg_cpm.toFixed(1))}
										</td>
									</tr>
								))}
								<tr>
									<td colSpan={6} className="border-t" />
								</tr>
							</tbody>
						)}
					</table>
				</div>
			</div>
		</div>
	);
}
