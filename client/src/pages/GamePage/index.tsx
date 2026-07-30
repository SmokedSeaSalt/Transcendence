import { useEffect } from "react";
import { useState } from "react";
import ErrorBox from "./ErrorBox";
import GamePageHeader from "./GamePageHeader";
import GameTextField from "./GameTextField";
import ProgressField from "./ProgressField";
import { useSocket } from "./SocketContext";

export default function GamePage() {
	const [message, setMessage] = useState("");
	const { socket, roomState, errorStatus } = useSocket();

	// useEffect(() => {
	// 	if (!socket) setMessage("No socket.");
	// 	else if (socket.id === undefined) {
	// 		setMessage("Socket.id undefined.");
	// 	} else {
	// 		setMessage(socket.id);
	// 	}
	// }, [roomState]);

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
