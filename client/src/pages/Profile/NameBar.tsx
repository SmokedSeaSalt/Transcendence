import { useAuthContext } from "../../components/AuthContext";
import ApiKeyButton from "./APIKeyButton";
import LogoutButton from "./LogoutButton";

export default function NameBar() {
	const { currentUser } = useAuthContext();

	return (
		<section className="flex items-center">
			<div className="flex-1 flex justify-start">
				<ApiKeyButton />
			</div>

			<h1
				className="p-4 text-highlight-colored text-3xl font-bold"
				id="profile-title"
			>
				{currentUser === null ? "Your" : currentUser.name}'s Profile
			</h1>

			<div className="flex-1 flex justify-end">
				<LogoutButton />
			</div>
		</section>
	);
}
