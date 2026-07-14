import Button from "../../components/Button";
import { useLogout } from "./useLogout";

export default function LogoutButton() {
	const { logout, loading, error } = useLogout();

	const clickLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // prevent default page reload
		await logout();
	};

	return (
			<div style={{padding: "1em"}}>
				<Button onClick={clickLogout} type={"button"} loading={loading}>Logout</Button>
			</div>
	);
}
