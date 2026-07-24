import type { Socket } from "socket.io";
import { io } from "../app.js";
import { roomStore } from "../services/roomStore.js";
import { validateIncommingWord } from "../services/gameService.js";

export function registerGameHandlers(socket: Socket) {
	socket.on("completedWord", (typedWord: string) => {
		console.log(`completedWord: ${typedWord} reveived from ${socket.id}`);

		const room = validateIncommingWord(socket.data.roomId, socket.id, typedWord);

		if (!room) {
			return;
		}

		io.to(socket.data.roomId).emit("roomState", room)

	});
}
