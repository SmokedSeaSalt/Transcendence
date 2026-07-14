import ApiKeyButton from "./APIKeyButton";
import LogoutButton from "./LogoutButton";
import { useLogout } from "./useLogout";

export default function NameBar() {
	//const currentUser = userAuth();
	const currentUser = "testuser";
	const { logout, loading, error } = useLogout();

	return (
		<section style={{ display: "flex", alignItems: "center"}}>
			<div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
				<ApiKeyButton />
			</div>
			<h1 style={{padding: "1em"}} id="profile-title">{currentUser}</h1>
			<div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
				<LogoutButton />
			</div>
		</section>
	);
};
