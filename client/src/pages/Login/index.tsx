import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default function LoginPage() {
	return (
		<main
			style={{
				display: "flex",
				maxWidth: 960,
				margin: "2rem auto",
				boxShadow: "0 2px 8px rgba(222, 39, 39, 0.06)",
			}}
		>
			<RegistrationForm />
			<LoginForm />
		</main>
	);
}
