import ApiKeyButton from "./APIKeyButton";
import LogoutButton from "./LogoutButton";
import { useLogout } from "./useLogout";

export default function NameBar() {
	const { logout, loading, error } = useLogout();

	return (
		<section style={{ flex: 1, display: "flex", alignItems: "center"}}>
			<ApiKeyButton></ApiKeyButton>
			<h2 style={{width: "70%"}} id="profile-title">Profile</h2>
			<LogoutButton></LogoutButton>
		</section>
	);
};
