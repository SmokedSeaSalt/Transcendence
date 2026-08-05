import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import ErrorBox from "./ErrorBox";
import FinishedGamePopup from "./FinishedGamePopup";
import GamePageHeader from "./GamePageHeader";
import GameTextField from "./GameTextField";
import ProgressField from "./ProgressField";
import { useSocket } from "./SocketContext";
import { RoomState, type RoomStatePayload, RoomUser } from "./SocketTypes";

function isCurrentUserSpectator(
	roomState: RoomStatePayload | undefined,
	socketId: string | undefined,
) {
	if (!roomState || !socketId) return false;
	return !(socketId in roomState.users);
}

export default function GamePage() {
	const [message, setMessage] = useState("");
	const { socket, roomState, errorStatus } = useSocket();

	if (errorStatus) {
		return <ErrorBox />;
	}
	if (!roomState) {
		return <ErrorBox />;
	}

	const isSpectator = isCurrentUserSpectator(roomState, socket?.id);

	return (
		<main className="p-8 pt-4 font-sans">
			<GamePageHeader isSpectator={isSpectator} />
			{message ? <p>Socket id: {message}</p> : null}
			<FinishedGamePopup />
			{roomState?.state === RoomState.FINISHED ? (
				<div>The game has finished. Please wait to go to the next lobby.</div>
			) : null}
			<div className="max-h-100/100">
				<div className="p-3 my-3">
					{roomState ? <ProgressField /> : <h1>No room state.</h1>}
				</div>
				<div className="p-3 my-3">
					<GameTextField isSpectator={isSpectator} prompt={roomState?.prompt} />
				</div>
			</div>
		</main>
	);
}
