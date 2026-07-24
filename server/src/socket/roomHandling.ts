import type { Socket } from "socket.io";
import { joinRoom } from "../services/roomService.js";

export function registerRoomHandlers(socket: Socket) {
	// todo get databaseUserId. socket.data.databaseUserId doesnt exist. change to socket.data.userId. also socket.data.name should be displayName
	socket.on("joinRoom", (roomId: string) => {
		if (
			!joinRoom(roomId, socket.id, socket.data.name, socket.data.databaseUserId)
		) {
			// todo callback
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
