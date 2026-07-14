import React from "react";
import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_temp_cat.png";
// import { userAuth } from "../hooks/userAuth";

type jsonUser = {
	user: string;
	name: string;
	email: string;

};


export default function Header() {
	// const {current_user, loading, error} = userAuth();

	// const current_user = userAuth();
	

	// TRY IN THIS FILE
	// const [data, setData] = useState<jsonUser | undefined>(undefined);
	const [data, setData] = useState<jsonUser | undefined>(undefined);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/web/users/me");
				const jsonData = await response.json();
				console.log("json data header: ", jsonData);
				setData(jsonData);
			} catch (error) {
				console.log(error, "error");
			}
		};
		fetchData();
	}, []);


	return (
		<header className="bg-gray-900 border-t mt-0">
			<div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-orange-600">
				<div className="left-30">
					<Link to="/">
						<img src={logo} alt="typeracer logo" width="120" height="120" />
					</Link>
				</div>
				<div className="text-xl font-bold">
					<h1>Transcendence Typeracer</h1>
				</div>
				<div className="mt-3 sm:mt-0 flex items-center space-x-4">
					<Link to="/leaderboard">
						<button
							type="button"
							className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl"
						>
							🏆 Leaderboard
						</button>
					</Link>
					{/* {userAuth() == null ? ( */}
					{data == undefined || !data.name ? (
						<Link to="/login" className="text-white hover:text-orange-600">
							<button
								type="button"
								className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl"
							>
								Log in / Make an Account
							</button>
						</Link>
					) : (
						<Link to="/profile" className="text-white hover:text-orange-600">
							<button
								type="button"
								className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl"
							>
								{data.name}'s Profile
							</button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}

// OLD VERSION

// 	// export const userAuth = async () : Promise< JSON | null > => {
// export const userAuth = async () => {
// 	// todo: set loading & error properly
// 	// const [loading, setLoading] = useState(false); // todo: change without usestate
// 	// const [error, setError] = useState<string | null>(null);
// 	// setLoading(true);
// 	// setError(null);

// 	try {
// 		const res = await fetch("/web/users/me");
// 		if (!res.ok)
// 			throw new Error((await res.json()).error || "Finding user failed");
// 		return (await res.json());
// 		// return null;
// 	} catch (err) {
// 		// setError(err instanceof Error ? err.message : String(err));
// 		console.log("error thrown user auth");
// 		throw err;
// 	} finally {
// 		// setLoading(false);
// 	}
	
// };