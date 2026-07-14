// import { useNavigate } from "react-router-dom";
import type { User } from "@prisma/client";
import { useState, useEffect } from "react";

export type jsonUser = {
	name: string;
	email: string;
	createdAt: string; // todo: change to actual type
};

// hook to return either user object or null if user is not logged in
export const userAuth = () => {
	const [userData, setData] = useState<jsonUser | null>(null);
	const [loading, setLoading] = useState <boolean>(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/web/users/me");
				if (!response.ok)
					setData(null);
				else
				{
					const jsonData = await response.json();
					console.log("json data from /web/users/me: ", jsonData);
					setData(jsonData);
				}
			} catch (error) {
				console.log(error, "error");
			}
			finally{
				setLoading(false);
			}
		};
		fetchData();
	}, []);
	return { userData, loading };
};
