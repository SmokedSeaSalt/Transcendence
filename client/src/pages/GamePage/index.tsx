import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import ErrorBox from "./ErrorBox";
import GamePageHeader from "./GamePageHeader";
import GameTextField from "./GameTextField";
import ProgressField from "./ProgressField";
import { useSocket } from "./SocketContext";
import type { RoomStatePayload } from "./SocketTypes";

export default function GamePage() {
	const [message, setMessage] = useState("");
	const { socket, setRoomState, roomState } = useSocket();
	const [errorStatus, setErrorStatus] = useState(false);
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
			setErrorStatus(false);
		});
	}, [socket, setRoomState]);

	useEffect(() => {
		socket?.on("disconnect", () => {
			setErrorStatus(true);
		});
	}, [socket]);

	if (roomState)
		console.log(
			"Current user count in index: ",
			Object.keys(roomState.users).length,
		);

	if (errorStatus) {
		return <ErrorBox />;
	}

	return (
		<main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
			<GamePageHeader />
			{message ? <p>Socket id: {message}</p> : null}
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
