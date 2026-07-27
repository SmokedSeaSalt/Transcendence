import { useState } from "react";
import { useSocket } from "./SocketContext";

export const useConnectToRoom = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { socket, setRoomState, roomState } = useSocket();

	const storeRoomId = async (roomId: string) => {
		setLoading(true);
		setError(null);
		try {
			socket?.emit("joinRoom", roomId);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { storeRoomId, loading, error };
};
