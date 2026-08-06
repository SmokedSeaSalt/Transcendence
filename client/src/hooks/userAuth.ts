import { useCallback, useEffect, useState } from "react";

export type jsonUser = {
	name: string;
	email: string;
	createdAt: string;
};

// hook to return either user object or null if user is not logged in
export const userAuth = () => {
	const [userData, setData] = useState<jsonUser | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch("/web/me");
			if (!response.ok) setData(null);
			else {
				const jsonData = await response.json();
				setData(jsonData);
			}
		} catch (error) {
			console.log(error, "error");
			setData(null);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { userData, loading, refetch: fetchData };
};
