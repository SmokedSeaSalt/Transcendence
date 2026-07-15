import { useAuthContext } from "../../App";
import ApiKeyButton from "./APIKeyButton";
import LogoutButton from "./LogoutButton";

export default function NameBar() {
	const { currentUser } = useAuthContext();
	// const currentUser = "testuser"; //todo change to currentusercontext

	return (
		<section style={{ display: "flex", alignItems: "center" }}>
			<div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
				<ApiKeyButton />
			</div>
			<h1 style={{ padding: "1em" }} id="profile-title">
				{currentUser === null ? "Your" : currentUser.name}'s Profile
			</h1>
			<div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
				<LogoutButton />
			</div>
		</section>
	);
}
