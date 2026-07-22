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
	setRoomState: (state: RoomStatePayload | null) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket<
		ServerToClientEvents,
		ClientToServerEvents
	> | null>(null);
	const [roomState, setRoomstate] = useState<RoomStatePayload | null>(null);

	const value: SocketContextType = {
		socket: socket,
		roomState: roomState,
		setRoomState: setRoomstate,
	};

	useEffect(() => {
		const s = io({
			path: "/web/socket.io",
			withCredentials: true,
		});
		setSocket(s);

		return () => {
			s.disconnect();
			setSocket(null);
			setRoomstate(null);
		};
	}, []);

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
