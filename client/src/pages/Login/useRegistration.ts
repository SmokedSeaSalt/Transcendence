import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegistration = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const nav = useNavigate();

	const register = async (payload: { name: string; email: string; password: string }) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/web/users/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok) throw new Error((await res.json()).message || "Registration failed");
			const data = await res.json();
			localStorage.setItem("token", data.token ?? "");
			nav("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { register, loading, error };
};