import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/AuthContext";

export default function UserStats() {
	const statClass = "m-2 p-2 bg-blue-100 rounded-md";

	return (
		<div className="p-2 m-3 w-20/100">
			<div className={statClass}>Wins: </div>
			<div className={statClass}>Losses: </div>
			<div className={statClass}>Max wpm: </div>
		</div>
	);
}
