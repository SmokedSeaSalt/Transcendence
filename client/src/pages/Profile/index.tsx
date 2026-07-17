import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/AuthContext";
import NameBar from "./NameBar";

export default function ProfilePage() {
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
