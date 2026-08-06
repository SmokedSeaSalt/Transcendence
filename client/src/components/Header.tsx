import { Link } from "react-router-dom";
import logo from "../assets/bike.svg";
import { useAuthContext } from "./AuthContext";
import Button from "./Button";
import type * as CSS from "csstype";

export default function Header() {
	const { currentUser } = useAuthContext();

	const checkerStyle: CSS.Properties = 
	{
		background: "repeating-conic-gradient(white 0 25%, black 0 50%) 0% / 50px 50px",
	}

	return (
		<header className="bg-header border-b border-highlight-colored mt-0">
			<div className="px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-highlight-colored">
				<div className="left-30">
					<Link to="/">
						{/* <div className="bg-surface bg-[radial-gradient(closest-side,theme(colors.rose.100),theme(colors.pink.400),theme(colors.purple.500))] outline-2 rounded-md p-2"> */}
						<div style={checkerStyle} className="bg-surface outline-2 rounded-md p-2">
							<img
								className="hue-rotate-160"
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
							<Button type="button">
								{/*{currentUser.name}'s Profile*/}
								Profile
							</Button>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
