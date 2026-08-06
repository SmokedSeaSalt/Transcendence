import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../../components/Button";
import Input from "../../components/Input";
import { loginSchema } from "./schemas";
import { useLogin } from "./useLogin";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const { login, loading, error } = useLogin();

	const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent default page reload
		const result = loginSchema.safeParse({ email, password });
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
		await login({ email, password });
	};

	return (
		<section className="flex-1 p-6">
			<h2 className="text-text-colored font-bold text-2xl mb-1">Login</h2>
			<form onSubmit={submit} className="flex flex-col gap-2">
				<div>
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
					{fieldErrors.email && (
						<div role="alert" className="text-red-600">
							{fieldErrors.email}
						</div>
					)}
				</div>
				<div>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
						type="password"
					/>
					{fieldErrors.password && (
						<div role="alert" className="text-red-600">
							{fieldErrors.password}
						</div>
					)}
				</div>
				{error ? (
					<div role="alert" className="text-red-600">
						{error}
					</div>
				) : null}
				<LoginButton loading={loading}>Login</LoginButton>
			</form>
		</section>
	);
}
