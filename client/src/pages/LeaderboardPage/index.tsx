import { useState } from "react";
import Leaderboard from "./Leaderboard";

export default function LeaderboardPage() {
	return (
		<main className="p-1 scrollbar-custom">
			<h1 className="pt-5 font-bold text-highlight-colored text-center text-4xl">
				Leaderboard
			</h1>
			<Leaderboard />
		</main>
	);
}
