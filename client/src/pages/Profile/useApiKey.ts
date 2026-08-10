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
				throw new Error((await res.json()).message || "Failed to generate API key.");
			//return api key
			return (await res.json()).apikey;
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			return "Failed to generate API key.";
		} finally {
			setLoading(false);
		}
	};

	return { getapikey, loading, error };
};
