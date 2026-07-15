import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../App";

export const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const nav = useNavigate();
	const { updateLoggedinUser } = useAuthContext();

	const login = async (payload: { email: string; password: string }) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/web/users/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			if (!res.ok)
				throw new Error((await res.json()).message || "Registration failed");
			await updateLoggedinUser();
			nav("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
		}
	};
	return { login, loading, error };
};
