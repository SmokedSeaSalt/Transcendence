import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NameBar from "./NameBar";
import { useAuthContext } from "../../components/AuthContext";

export default function ProfilePage() {
	const { updateLoggedinUser, currentUser } = useAuthContext();
	const nav = useNavigate();

	useEffect(() => {
		updateLoggedinUser();
	}, [updateLoggedinUser]);

	if (currentUser === null) {
		nav("/login");
	}

	return (
		<main
			style={{
				//display: "flex",
				maxWidth: "100%",
				//margin: "2rem auto",
				//boxShadow: "0 2px 8px rgba(222, 39, 39, 0.06)",
			}}
		>
			<NameBar />
		</main>
	);
}
