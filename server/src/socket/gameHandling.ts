import type { Server, Socket } from "socket.io";
import { RoomState } from "../config/socket.js";
import { validateIncomingWord } from "../services/gameService.js";


export function registerGameHandlers(io: Server, socket: Socket) {
	socket.on("completedWord", async (typedWord: string) => {
		if (socket.data.isSpectator) return;

		const room = await validateIncomingWord(
			socket.data.roomId,
			socket.id,
			typedWord,
		);

		if (!room) {
			return;
		}

		io.to(socket.data.roomId).emit("roomState", room);

		if (room.state === RoomState.FINISHED) {
			// todo finish game here
		}
	});
}
