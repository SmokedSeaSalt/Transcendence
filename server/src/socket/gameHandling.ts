import type { Server, Socket } from "socket.io";
import { postGameCountDownMs } from "../config/gameSettings.js";
import { RoomState } from "../config/socket.js";
import { validateIncomingWord } from "../services/gameService.js";
import { RoomData, roomStore, userInfo } from "../services/roomStore.js";

async function handleRoomReset(roomId: string, io: Server) {
	const oldRoom = roomStore.get(roomId);
	if (!oldRoom) return;
	const oldRoomUsers = oldRoom.users;
	if (!oldRoomUsers) return;

	const connectedClientSockets = await io.in(roomId).fetchSockets();

	if (connectedClientSockets.length === 0) {
		console.log("Socketio room is empty. Deleting the room from roomStore.")
		roomStore.delete(roomId);
		return;
	}
	// wipe the old room in roomStore
	roomStore.create(roomId);

	for (const socket of connectedClientSockets) {
		console.log(socket.id);
		roomStore.addUser(
			roomId,
			socket.id,
			socket.data.displayName,
			socket.data.userId,
		);
	}
	console.log(roomStore.get(roomId));
	roomStore.setState(roomId, RoomState.LOBBY);
}

export function registerGameHandlers(io: Server, socket: Socket) {
	socket.on("completedWord", (typedWord: string) => {
		const room = validateIncomingWord(socket.data.roomId, socket.id, typedWord);

		if (!room) {
			return;
		}

		io.to(socket.data.roomId).emit("roomState", room);

		if (room.state === RoomState.FINISHED) {
			setTimeout(async () => {
				await handleRoomReset(room.roomId, io);
				io.to(socket.data.roomId).emit(
					"roomState",
					roomStore.get(socket.data.roomId),
				);
			}, postGameCountDownMs);
		}
	});
}
