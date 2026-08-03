import type { Server, Socket } from "socket.io";
import { RoomState } from "../config/socket.js";
import {
	finishAndSaveGameIfDone,
	validateIncomingWord,
} from "../services/gameService.js";
import { endGame } from "./gameLifecycle.js";

export function registerGameHandlers(io: Server, socket: Socket) {
	socket.on("completedWord", async (typedWord: string) => {
		if (socket.data.isSpectator) return;

		const room = await validateIncomingWord(
			socket.data.roomId,
			socket.id,
			typedWord,
		);
		if (!room || !room.wordCount) return;

		const user = room.users[socket.id];

		//only if player is on last word check if room is finished
		if (user.progress >= room.wordCount) {
			finishAndSaveGameIfDone(room, io);
		}
		io.to(socket.data.roomId).emit("roomState", room);
	});
}
