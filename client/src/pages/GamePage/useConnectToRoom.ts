import { useState } from "react";
import { useSocket } from "./SocketContext";

export const useConnectToRoom = () => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string>("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { socket, setRoomState, roomState } = useSocket();

	const emitJoinRoom = async (roomId: string): Promise<{ success: boolean; message: string }> => {
		setLoading(true);
		setError(null);
		try {
			const result = await new Promise<{ success: boolean; message: string }>((resolve, reject) => {
				if (!socket) {
					reject(new Error("Socket not connected"));
					return;
				}
				socket.emit("joinRoom", roomId, (success: boolean, message: string | undefined) => {
					resolve({ success, message: message ?? ""});
				});
			});
			return result;
		} catch (err) {
			const errMessage = err instanceof Error ? err.message : String(err);
			setError(errMessage);
			return { success: false, message: errMessage };
		} finally {
			setLoading(false);
		}
	};

	return { emitJoinRoom, loading, error };
};