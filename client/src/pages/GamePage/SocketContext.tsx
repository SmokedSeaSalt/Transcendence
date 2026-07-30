import { createContext, useContext, useEffect, useRef, useState } from "react";
import { type Socket, io } from "socket.io-client";
import type {
	ClientToServerEvents,
	RoomStatePayload,
	ServerToClientEvents,
} from "./SocketTypes";

export interface SocketContextType {
	socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
	roomState: RoomStatePayload | null;
	errorStatus: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket<
		ServerToClientEvents,
		ClientToServerEvents
	> | null>(null);
	const [roomState, setRoomState] = useState<RoomStatePayload | null>(null);
	const [errorStatus, setErrorStatus] = useState<boolean>(false);

	const value: SocketContextType = {
		socket: socket,
		roomState: roomState,
		errorStatus: errorStatus,
	};

	useEffect(() => {
		const s = io({
			path: "/web/socket.io",
			withCredentials: true,
			auth: {
				displayName: localStorage.getItem("display_name"),
			},
		});
		console.log("socket being set in io");
		setSocket(s);

		return () => {
			s.disconnect();
			setSocket(null);
			setRoomState(null);
		};
	}, []);

	useEffect(() => {
		socket?.on("connect", () => {
			console.log("socket id: ", socket.id);
			socket.on("roomState", (payload: RoomStatePayload) => {
				console.log("roomState received");
				setRoomState(payload);
			});
			setErrorStatus(false);
		});
	}, [socket]);

	useEffect(() => {
		socket?.on("disconnect", () => {
			setErrorStatus(true);
		});
	}, [socket]);

	return <SocketContext value={value}>{children}</SocketContext>;
};

export function useSocket() {
	const socket = useContext(SocketContext);
	if (!socket) {
		throw new Error("useSocket must be used within a SocketProvider");
		// todo: catch somewhere?
	}
	return socket;
}
