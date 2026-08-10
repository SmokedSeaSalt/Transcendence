import { useState } from "react";
import { useSocket } from "./SocketContext";

export const useStartGame = () => {
	const [errorStart, setError] = useState<string | null>(null);
	const { socket, roomState } = useSocket();

	const startGame = async () => {
		setError(null);
		try {
			socket?.emit("startGame");
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		}
	};

	return { startGame, errorStart };
};
