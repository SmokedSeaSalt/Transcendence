import { useState } from "react";

export const useSetDisplayName = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const storeDisplayName = async (name: string) => {
		setLoading(true);
		setError(null);
		try {
			localStorage.setItem("display_name", name);
			console.log("Set name to: ", name);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { storeDisplayName, loading, error };
};
