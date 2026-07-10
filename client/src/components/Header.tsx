import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_temp_cat.png";

export default function Header() {
	const is_logged_in = true; /* replace with actual login status from somewhere else*/

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
					{is_logged_in ? (
						<Link to="/profile" className="text-white hover:text-orange-600">
							<button
								type="button"
								className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl"
							>
								View profile
							</button>
						</Link>
					) : (
						<Link to="/login" className="text-white hover:text-orange-600">
							<button
								type="button"
								className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-xl"
							>
								Log in / Make an Account
							</button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
