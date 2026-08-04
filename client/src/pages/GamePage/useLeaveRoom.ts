import { useState } from "react";
import { useSocket } from "./SocketContext";

export const useLeaveRoom = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { socket, roomState } = useSocket();

	const leaveRoom = async () => {
		setLoading(true);
		setError(null);
		try {
			socket?.emit("leaveRoom");
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { leaveRoom, loading, error };
};
