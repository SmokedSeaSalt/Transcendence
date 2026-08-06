import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/AuthContext";
import DisplayNameForm from "./DisplayNameForm";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default function LoginPage() {
	const { updateLoggedinUser, currentUser, loading } = useAuthContext();
	const nav = useNavigate();

	useEffect(() => {
		updateLoggedinUser();
	}, [updateLoggedinUser]);

	//cannot go to /login when already logged in
	useEffect(() => {
		if (!loading && currentUser) {
			//replace true replaces history as if the page has not even been visited
			nav("/profile", { replace: true });
		}
	}, [loading, currentUser, nav]);

	if (loading) {
		return <div>Loading...</div>;
	}

	//dont load anything if we will be redirecting
	if (!currentUser === null) {
		return null;
	}

	return (
		<main>
			<div className="flex max-w-[960px] mx-auto my-8">
				<RegistrationForm />
				<LoginForm />
			</div>
			<div className="flex max-w-[960px] mx-auto my-8">
				<DisplayNameForm />
			</div>
		</main>
	);
}
