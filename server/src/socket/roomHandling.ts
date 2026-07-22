import type { Socket } from "socket.io";

export function registerRoomHandlers(socket: Socket) {
	socket.on("joinRoom", (roomId: string) => {
		console.log(`joinRoom: ${roomId} request reveived from ${socket.id}`);
	});

	socket.on("leaveRoom", () => {
		console.log(`leaveRoom received from ${socket.id}`);
	});

	socket.on("startGame", () => {
		console.log(`startGame received from ${socket.id}`);
	});
}
