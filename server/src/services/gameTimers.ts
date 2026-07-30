import { io } from "../app.js";
import { RoomState } from "../config/socket.js";
import { roomFinishedTimeoutAndEmitRoomState } from "../socket/gameHandling.js";
import { saveGameSession } from "./gameSessionServices.js";
import { roomStore } from "./roomStore.js";

const gameTimeouts = new Map<string, NodeJS.Timeout>(); // <roomId, timeout>

export const startTimer = (roomId: string, durationMs: number) => {
	const timeout = setTimeout(() => {
		console.log(`Game timeout in room ${roomId}`);
		gameTimeouts.delete(roomId);

		const room = roomStore.get(roomId);
		if (!room) return;
		roomStore.setState(roomId, RoomState.FINISHED);
		saveGameSession(room);
		io.to(room.roomId).emit("roomState", room);
		roomFinishedTimeoutAndEmitRoomState(room.roomId, io);
	}, durationMs);

	gameTimeouts.set(roomId, timeout);
};

export const cancelTimer = (roomId: string) => {};
