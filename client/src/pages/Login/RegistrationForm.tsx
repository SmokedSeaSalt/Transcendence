import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "./useRegistration";
import { createUserSchema } from "./schemas"
import LoginButton from "../../components/LoginButton"


export default function RegistrationForm() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const { register, loading, error } = useRegistration();

	const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent default page reload
		const result = createUserSchema.safeParse({ email, name, password });
		if (!result.success) {
			const errors: Record<string, string> = {};
			result.error.issues.forEach((err) => {
				const field = err.path[0] as string;
				errors[field] = err.message;
			});
			setFieldErrors(errors);
			return;
		}
		setFieldErrors({});
		await register({ email, name, password });
	};

	return (
		<section style={{ flex: 1, padding: 24 }}>
			<h2 id="login-title">Create account</h2>
			<form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
				<div>
					<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
					{fieldErrors.email && <div role="alert" style={{ color: "red" }}>{fieldErrors.email}</div>}
				</div>
				<div>
					<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
					{fieldErrors.name && <div role="alert" style={{ color: "red" }}>{fieldErrors.name}</div>}
				</div>
				<div>
					<input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
					{fieldErrors.password && <div role="alert" style={{ color: "red" }}>{fieldErrors.password}</div>}
				</div>
				{error ? <div role="alert" style={{ color: "red" }}>{error}</div> : null}
				<LoginButton loading={loading}>Register</LoginButton>
			</form>
		</section>
	);
}

// todo: input validation and password checking