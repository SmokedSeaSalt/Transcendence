import { io } from "../app.js";
import { gameTimeout, postGameCountDownMs } from "../config/gameSettings.js";
import { RoomState } from "../config/socket.js";
import { saveGameSession } from "../services/gameSessionServices.js";
import { type RoomData, roomStore } from "../services/roomStore.js";
import { handleRoomReset } from "./roomHandling.js";

// after postGameCountDownMs, the still active users will be in a reset lobby together. Clients will then be informed by an emit of the new roomstate
function scheduleRoomReset(roomId: string) {
	setTimeout(async () => {
		await handleRoomReset(roomId, io);
		const room = roomStore.get(roomId);
		if (!room) return;
		io.to(roomId).emit("roomState", room);
	}, postGameCountDownMs);
}

export async function endGame(roomId: string, reason: string) {
	console.log(`endGame() called with reason ${reason}`);
	cancelTimeout(roomId);

	roomStore.setState(roomId, RoomState.FINISHED);

	const room = roomStore.get(roomId);
	if (!room) return;
	await saveGameSession(room);

	io.to(roomId).emit("roomState", room);

	scheduleRoomReset(roomId);
}

const gameTimeouts = new Map<string, NodeJS.Timeout>(); // <roomId, timeout>

export const startTimeout = (roomId: string, durationMs: number) => {
	const timeout = setTimeout(() => {
		endGame(roomId, "timeout");
	}, durationMs);

	gameTimeouts.set(roomId, timeout);
};

export const cancelTimeout = (roomId: string) => {
	const timeout = gameTimeouts.get(roomId);

	if (timeout) {
		clearTimeout(timeout);
		gameTimeouts.delete(roomId);
	}
};
