import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/AuthContext";
import { getUserStats } from "./getUserStats";

export default function UserStats() {
	const statClass = "m-2 p-2 bg-blue-100 rounded-md";
	const { userStats, loading } = getUserStats();

	if (userStats === null)
		return (<></>);

	return (
		<div className="p-2 m-3 w-20/100">
			<div className={statClass}>Wins: {userStats.wins}</div>
			<div className={statClass}>Average wpm: {userStats.average_wpm}</div>
			<div className={statClass}>Max wpm: {userStats.max_wpm} </div>
		</div>
	);
}
