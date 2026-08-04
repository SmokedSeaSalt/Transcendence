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
			if (!res.ok) {
				if (res.status === 502) throw new Error("The registration service is temporarily unavailable");
				throw new Error((await res.json()).message || "Login failed");
			}
			await updateLoggedinUser();
			nav("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setLoading(false);
		}
	};

	return { register, loading, error };
};
