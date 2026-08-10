import { Link } from "react-router-dom";
import logo from "../assets/bike.svg";
import { useAuthContext } from "./AuthContext";
import Button from "./Button";

export default function Header() {
	const { currentUser } = useAuthContext();

	return (
		<header className="bg-header border-b border-highlight-colored mt-0">
			<div className="px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-highlight-colored">
				<div className="left-30">
					<Link to="/">
						<div className="flex bg-[repeating-conic-gradient(#ff9100_0%_5%,_#ffba63_5%_10%,_#ff9100_10%_15%,_#FF7300_15%_20%)] rounded-md p-2 outline-2">
							<img
								className="rotate-345 filter-[drop-shadow(-2px_0px_#ffffff)]"
								src={logo}
								alt="typeracer logo"
								width="120"
								height="120"
							/>
						</div>
					</Link>
				</div>
				<div className="text-7xl font-bold">
					<Link to="/" className="unstyled-link">
						<h1>Gotta Bike Fast!</h1>
					</Link>
				</div>
				<div className="mt-3 sm:mt-0 flex text-lg items-center space-x-4">
					<Link to="/leaderboard">
						<Button type="button">🏆 Leaderboard</Button>
					</Link>
					{currentUser === null ? (
						<Link to="/login">
							<Button type="button">Log in / Make an Account</Button>
						</Link>
					) : currentUser === null ? (
						<Link to="/profile">
							<Button type="button">Your Profile</Button>
						</Link>
					) : (
						<Link to="/profile">
							<Button type="button">Profile</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
