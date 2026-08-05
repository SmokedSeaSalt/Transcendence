import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import Leaderboard from "./Leaderboard";

export default function LeaderboardPage() {
	const [message, setMessage] = useState("");

	return (
		<main className="p-1">
			<h1 className="pt-5 text-center text-3xl">Leaderboard</h1>
			<Leaderboard />
		</main>
	);
}
