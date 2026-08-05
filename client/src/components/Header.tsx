import { Link } from "react-router-dom";
import logo from "../assets/bike.svg";
import { useAuthContext } from "./AuthContext";
import Button from "./Button";

export default function Header() {
	const { currentUser } = useAuthContext();

	return (
		<header className="bg-header border-b border-highlight-colored mt-0">
			<div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-orange-600">
				<div className="left-30">
						<Link to="/">
					<div className="bg-surface rounded-md p-2">
							<img src={logo} alt="typeracer logo" width="120" height="120" />
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
						<Button
							type="button"
						>
							🏆 Leaderboard
						</Button>
					</Link>
					{currentUser === null ? (
						<Link to="/login">
							<Button
								type="button"
							>
								Log in / Make an Account
							</Button>
						</Link>
					) : currentUser === null ? (
						<Link to="/profile">
							<Button
								type="button"
							>
								Your Profile
							</Button>
						</Link>
					) : (
						<Link to="/profile">
							<Button
								type="button"
							>
								{currentUser.name}'s Profile
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
