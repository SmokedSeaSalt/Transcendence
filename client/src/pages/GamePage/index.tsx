import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import GamePageHeader from "./GamePageHeader";
import GameTextField from "./GameTextField";
import ProgressField from "./ProgressField";
import { useSocket } from "./SocketContext";
import { RoomState, type RoomStatePayload } from "./SocketTypes";
import FinishedGamePopup from "./FinishedGamePopup";

export default function GamePage() {
	const [message, setMessage] = useState("");
	const { socket, setRoomState, roomState } = useSocket();
	useEffect(() => {
		socket?.on("connect", () => {
			console.log(socket.id);
			if (socket.id === undefined) {
				setMessage("No valid socket.id");
			} else {
				setMessage(socket.id);
			}

			socket.on("roomState", (payload: RoomStatePayload) => {
				console.log("roomState received");
				setRoomState(payload);
			});
		});
	}, [socket, setRoomState]);

	if (roomState)
		console.log(
			"Current user count in index: ",
			Object.keys(roomState.users).length,
		);

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
