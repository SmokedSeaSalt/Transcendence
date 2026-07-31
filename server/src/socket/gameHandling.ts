import type { Server, Socket } from "socket.io";
import { RoomState } from "../config/socket.js";
import { validateIncomingWord } from "../services/gameService.js";
import { endGame } from "./gameLifecycle.js";


export function registerGameHandlers(io: Server, socket: Socket) {
	socket.on("completedWord", async (typedWord: string) => {
		if (socket.data.isSpectator) return;

		const validateIncomingWordResult = await validateIncomingWord(
			socket.data.roomId,
			socket.id,
			typedWord,
		);
		if (!validateIncomingWordResult) return;


		const { room, allActivePlayersFinished } = validateIncomingWordResult;


		io.to(socket.data.roomId).emit("roomState", room);


		if (allActivePlayersFinished) {
			endGame(room.roomId, "All active players are done. Triggered by completedWord.");
		}
	});
}
