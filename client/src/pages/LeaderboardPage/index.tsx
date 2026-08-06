import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import Leaderboard from "./Leaderboard";

export default function LeaderboardPage() {
	const [message, setMessage] = useState("");

	return (
		<main className="p-1 scrollbar-custom">
			<h1 className="pt-5 font-bold text-highlight-colored text-center text-4xl">
				Leaderboard
			</h1>
			<Leaderboard />
		</main>
	);
}
