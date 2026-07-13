// import { useNavigate } from "react-router-dom";
import type { User } from "@prisma/client";
// hook to return either user object or null if user is not logged in
import { useState } from "react";

export const userAuth = async () => {
	// todo: set loading & error properly
	// const [loading, setLoading] = useState(false); // todo: change without usestate
	// const [error, setError] = useState<string | null>(null);
	// setLoading(true);
	// setError(null);

	try {
		const res = await fetch("/web/users/me");
		if (!res.ok)
			throw new Error((await res.json()).error || "Finding user failed");
		// return (await res.json()).name;
		return null;
		// return (await res.json()).user, (await res.json()).name, (await res.json()).email;
	} catch (err) {
		// setError(err instanceof Error ? err.message : String(err));
		console.log("error thrown user auth");
		throw err;
	} finally {
		// setLoading(false);
	}
};
