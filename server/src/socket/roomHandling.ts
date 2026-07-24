import type { Socket } from "socket.io";
import { joinRoom } from "../services/roomService.js";

export function registerRoomHandlers(socket: Socket) {
	socket.on("joinRoom", (newRoomId: string, callback) => {
		const oldRoomId = socket.data.roomId;
		const success = joinRoom(
			oldRoomId,
			newRoomId,
			socket.id,
			socket.data.displayName,
			socket.data.userId,
		);
		if (!success) {
			callback(false, `Failed to join room ${newRoomId}. Room does not exist`);
			console.log(`${socket.id} failed to joinRoom: ${newRoomId}`);
			return;
		}
		socket.data.roomId = newRoomId;
		callback(true, `Joined room ${newRoomId}`);

		console.log(`${socket.id} joinRoom sucessful: ${newRoomId}`);
	});

	socket.on("leaveRoom", () => {
		console.log(`leaveRoom received from ${socket.id}`);
	});

	socket.on("startGame", () => {
		console.log(`startGame received from ${socket.id}`);
	});
}
