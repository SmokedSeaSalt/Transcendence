import React from "react";
import { useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

export default function LoginPage() {
	return (
		<main style={{ display: "flex", maxWidth: 960, margin: "2rem auto", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
			<RegistrationForm />
			<LoginForm />
		</main>
	);
}