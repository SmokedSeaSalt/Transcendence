import { useState } from "react";
import ErrorBox from "./ErrorBox";
import FinishedGamePopup from "./FinishedGamePopup";
import GamePageHeader from "./GamePageHeader";
import GameTextField from "./GameTextField";
import ProgressField from "./ProgressField";
import { useSocket } from "./SocketContext";
import { RoomState, type RoomStatePayload } from "./SocketTypes";

function isCurrentUserSpectator(
	roomState: RoomStatePayload | undefined,
	socketId: string | undefined,
) {
	if (!roomState || !socketId) return false;
	return !(socketId in roomState.users);
}

function isCurrentUserLeader(
	roomState: RoomStatePayload | undefined,
	socketId: string | undefined,
) {
	if (!roomState || !socketId) return false;
	return socketId === roomState.roomLeader;
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

	let lobbyMessage = "Waiting for the room leader to start the game!";
	if (isCurrentUserLeader(roomState, socket?.id))
		lobbyMessage = "Waiting for you to start the game!";
	let prompt = "";
	if (roomState?.prompt !== undefined) prompt = roomState?.prompt.join(" ");

	return (
		<main className="p-8 pt-4 font-sans">
			<GamePageHeader isSpectator={isSpectator} />
			{message ? <p>Socket id: {message}</p> : null}
			<FinishedGamePopup />
			{roomState?.state === RoomState.FINISHED ? (
				<div className="flex pt-4 justify-center">
					The game has finished. Please wait to be moved to the next lobby.
				</div>
			) : null}
			<div className="max-h-100/100">
				<div className="p-3 my-3">
					{roomState ? <ProgressField /> : <h1>No room state.</h1>}
				</div>
				<div className="p-3 my-3">
					{!prompt ? (
						<div className="text-center text-xl">{lobbyMessage}</div>
					) : (
						<GameTextField isSpectator={isSpectator} prompt={prompt} />
					)}
				</div>
			</div>
		</main>
	);
}
