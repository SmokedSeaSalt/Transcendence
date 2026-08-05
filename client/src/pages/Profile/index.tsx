import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/AuthContext";
import GameHistory from "./GameHistory";
import NameBar from "./NameBar";
import UserProgressionGraph from "./UserProgressionGraph";
import UserStats from "./UserStats";
import getGameHistory from "./getGameHistory";

export default function ProfilePage() {
	const gameHistory = getGameHistory();
	const { updateLoggedinUser, currentUser, loading } = useAuthContext();
	const nav = useNavigate();

	useEffect(() => {
		updateLoggedinUser();
	}, [updateLoggedinUser]);

	//cannot go to /profile when not logged in
	useEffect(() => {
		if (!loading && currentUser === null) {
			//replace true replaces history as if the page has not even been visited
			nav("/login", { replace: true });
		}
	}, [loading, currentUser, nav]);

	if (loading) {
		return <div>Loading...</div>;
	}

	//dont load anything if we will be redirecting
	if (currentUser === null) {
		return null;
	}

	return (
	<main className="max-w-full">
		<NameBar />

		<div className="flex max-w-[960px] mx-auto my-8">
			<UserStats />
			<UserProgressionGraph gameHistory={gameHistory} />
		</div>

		<GameHistory gameHistory={gameHistory} />
	</main>
	);
}
