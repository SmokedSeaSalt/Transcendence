import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_temp_cat.png"

export default function Header() {
	return (
		<header className="bg-white border-t border-gray-200 mt-8">
			<div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
				{/* make image clickable to home page? */}
				<div>
				<Link to="/">
						<img src={logo} alt="typeracer logo" width="120" height="120" />
				</Link>
				</div>
				<div><h1>Game Name</h1></div>
				<div className="mt-3 sm:mt-0 flex items-center space-x-4">
					<Link
						to="/leaderboard"
						className="text-gray-700 hover:text-blue-600"
					>
						🏆 Leaderboard
					</Link>
					<Link
						to="/profile"
						className="text-gray-700 hover:text-blue-600"
					>
						[Log in / Make an account OR view profile]
					</Link>
				</div>
			</div>
		</header>
	);
}
