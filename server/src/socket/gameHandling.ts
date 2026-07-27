import type { Server, Socket } from "socket.io";
import { validateIncommingWord } from "../services/gameService.js";
import { roomStore } from "../services/roomStore.js";

export function registerGameHandlers(io: Server, socket: Socket) {
	socket.on("completedWord", (typedWord: string) => {

		const room = validateIncommingWord(
			socket.data.roomId,
			socket.id,
			typedWord,
		);

		if (!room) {
			return;
		}

		io.to(socket.data.roomId).emit("roomState", room);
	});
}
