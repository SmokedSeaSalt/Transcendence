import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button";
import ProgressField from "./ProgressField";
import { useSocket } from "./SocketContext";
import type { RoomStatePayload } from "./SocketTypes";

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

	const handleClick = async () => {
		socket?.emit("completedWord", "test");
	};

	return (
		<main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
			<h1>React + Express</h1>
			<Button type="button" onClick={handleClick}>
				send socket event "completedWord" with the word "test"
			</Button>
			{message ? <p>Socket id: {message}</p> : null}
			<div className="max-h-screen">
				{/* <div className="p-3 my-3 bg-orange-200 outline-double"> */}
				<div className="p-3 my-3">
					{roomState ? (
						<ProgressField roomState={roomState} />
					) : (
						<h1>No room state.</h1>
					)}
				</div>
				<div className="p-3 my-3">This is where the type area would be.</div>
				{/* <div className="p-3 my-3 bg-orange-100 outline-double">This is where the type area would be.</div> */}
			</div>
		</main>
	);
}
