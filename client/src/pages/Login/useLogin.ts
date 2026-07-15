import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider, useAuthContext} from "../../App";
import { userAuth } from "../../hooks/userAuth";

export const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const nav = useNavigate();
	const { setLoggedIn } = useAuthContext();
	// const { refresh } = useAuthContext(); // unused refresh function, preferred over setLoggedIn if we fix hook-in-hook issue
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
			setLoggedIn(true);
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
