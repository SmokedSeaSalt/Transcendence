import { useState } from "react";
import { useSocket } from "./SocketContext";

export const useStartGame = () => {
	const [loadingStart, setLoading] = useState(false);
	const [errorStart, setError] = useState<string | null>(null);
	const { socket, roomState } = useSocket();

	const startGame = async () => {
		setLoading(true);
		setError(null);
		try {
			socket?.emit("startGame");
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { startGame, loadingStart, errorStart };
};
