import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import ErrorBox from "./ErrorBox";
import FinishedGamePopup from "./FinishedGamePopup";
import GamePageHeader from "./GamePageHeader";
import GameTextField from "./GameTextField";
import ProgressField from "./ProgressField";
import { useSocket } from "./SocketContext";
import { RoomState, type RoomStatePayload } from "./SocketTypes";

export default function GamePage() {
	const [message, setMessage] = useState("");
	const { socket, roomState, errorStatus } = useSocket();

	if (errorStatus) {
		return <ErrorBox />;
	}

	return (
		<main
			style={{ padding: "2rem", paddingTop: "1em", fontFamily: "sans-serif" }}
		>
			<GamePageHeader />
			{message ? <p>Socket id: {message}</p> : null}
			<FinishedGamePopup />
			{roomState?.state === RoomState.FINISHED ? (
				<div>The game has finished. Room will be rejoined</div>
			) : null}
			<div className="max-h-100/100">
				<div className="p-3 my-3">
					{roomState ? <ProgressField /> : <h1>No room state.</h1>}
				</div>
				<div className="p-3 my-3">
					<GameTextField prompt={roomState?.prompt} />
				</div>
			</div>
		</main>
	);
}
