import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const nav = useNavigate();

	const logout = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/web/users/logout");
			if (!res.ok)
				throw new Error((await res.json()).message || "Logout failed");
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
			nav("/");
		}
	};

	return { logout, loading, error };
};
