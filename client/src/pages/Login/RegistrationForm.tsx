import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "./useRegistration";

export default function RegistrationForm() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const { register, loading, error } = useRegistration();

	const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent default page reload
		await register({ email, name, password });
	};

	return (
		<section style={{ flex: 1, padding: 24 }}>
			<h2 id="login-title">Create account</h2>
			<form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
				<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
				<input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
				{error ? <div role="alert" style={{ color: "red" }}>{error}</div> : null}
				<button id="login-button" type="submit" disabled={loading}>{loading ? "Creating…" : "Sign up"}</button>
			</form>
		</section>
	);
}

// todo: input validation and password checking