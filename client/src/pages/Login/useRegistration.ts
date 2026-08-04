import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../components/AuthContext";

export const useRegistration = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const nav = useNavigate();
	const { updateLoggedinUser } = useAuthContext();

	const register = async (payload: {
		name: string;
		email: string;
		password: string;
	}) => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/web/users/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			const text = await res.text();

			if (!res.ok) {
				if (res.status === 502) {
					throw new Error("The login service is temporarily unavailable. Please try again later.");
				}
				try {
					const data = JSON.parse(text);
					throw new Error(data.message || "Login failed");
				} catch {
					throw new Error(`Login failed: ${text.slice(0, 100)}`);
				}
			}
			
			await updateLoggedinUser();
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
