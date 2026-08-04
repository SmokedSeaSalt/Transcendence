import type { Server } from "socket.io";
import { createUniqueRoom } from "./gameService.js";
import { roomStore } from "./roomStore.js";

export function transferRoom(
	oldRoomId: string,
	newRoomId: string,
	socketId: string,
	name: string,
	userId: number | undefined,
) {
	const room = roomStore.get(newRoomId);

	if (!room) {
		return null;
	}

	roomStore.deleteUser(oldRoomId, socketId);
	roomStore.addUser(newRoomId, socketId, name, userId);

	return room;
}

export async function handleLeftoverSpectators(roomId: string, io: Server) {
	const activeSockets = await io.in(roomId).fetchSockets();
	for (const socket of activeSockets) {
		socket.data.isSpectator = false;
		const newRoom = createUniqueRoom();
		if (!newRoom) {
			//disconnect client
			console.log("Error while creating unique room.");
			socket.disconnect();
			return;
		}
		console.log(
			`creating new room ${newRoom.roomId} for socketId: ${socket.id}`,
		);

		roomStore.addUser(
			newRoom.roomId,
			socket.id,
			socket.data.displayName,
			socket.data.userId,
		);
		socket.leave(roomId);
		socket.join(newRoom.roomId);
		socket.data.roomId = newRoom.roomId;
		const room = roomStore.get(newRoom.roomId);
		if (!room) {
			console.log(
				`Room ${socket.data.roomId} could not be established, disconnecting ${socket.id}`,
			);
			socket.disconnect();
			return;
		}
		io.to(socket.data.roomId).emit("roomState", room);
	}
}
