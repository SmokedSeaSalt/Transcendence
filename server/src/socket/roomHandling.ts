import type { Socket } from "socket.io";
import { joinRoom } from "../services/roomService.js";

export function registerRoomHandlers(socket: Socket) {
	socket.on("joinRoom", (roomId: string) => {
		if (
			!joinRoom(roomId, socket.id, socket.data.name, socket.data.databaseUserId)
		) {
			console.log(`${socket.id} failed to joinRoom: ${roomId}`);
		}
		console.log(`${socket.id} joinRoom sucessful: ${roomId}`);
	});

	socket.on("leaveRoom", () => {
		console.log(`leaveRoom received from ${socket.id}`);
	});

	socket.on("startGame", () => {
		console.log(`startGame received from ${socket.id}`);
	});
}
