import { useState } from "react";

export const useApiKey = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const getapikey = async (): Promise<string> => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/web/users/update-apikey");
			if (!res.ok)
				throw new Error((await res.json()).message || "Logout failed");
			//return api key
			return((await res.json()).apikey);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { getapikey, loading, error };
};
