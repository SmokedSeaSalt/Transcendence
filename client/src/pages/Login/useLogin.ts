import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../../hooks/userAuth";
import { useCurrentUserContext , userContextType} from "../../App";

export const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const nav = useNavigate();


	const {currentUser, setCurrentUser} = useCurrentUserContext();
	const currentUserInfo = userAuth();


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


			// const [currentUserInfo, loading2] = userAuth();
			// wants an iterator for some reason? so loading temporarily turned off
			setCurrentUser(currentUserInfo);


			// nav("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
		}
	};
	return { login, loading, error };
};
