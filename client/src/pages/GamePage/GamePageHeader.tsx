import Button from "../../components/Button";
import JoinRoomButton from "./JoinRoomButton";

export default function GamePageHeader() {

	return (
		<>
			<div className="flex place-content-end m-1 space-x-2">
				<JoinRoomButton />
				<Button type="button">Leave room (nonfunctional)</Button>
				<Button type="button">Start game (nonfunctional)</Button>
				<p>Current room ID: (nonfunctional)</p>
			</div>
		</>
	);
}
