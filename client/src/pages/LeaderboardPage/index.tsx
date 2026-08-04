import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import Leaderboard from "./Leaderboard";

export default function LeaderboardPage() {
	const [message, setMessage] = useState("");

	return (
		<main
			style={{ padding: "2rem", paddingTop: "1em", fontFamily: "sans-serif" }}
		>
			<h1 className="text-center">Leaderboard</h1>
			<Leaderboard />
		</main>
	);
}
