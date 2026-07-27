import type { Socket } from "socket.io";
import { transferRoom } from "../services/roomService.js";
import { createPrompt, createUniqueRoom } from "../services/gameService.js";
import { roomStore } from "../services/roomStore.js";
import { io } from "../app.js";
import { RoomState } from "../config/socket.js";
import { setTimeout as wait } from "node:timers/promises";

export function registerRoomHandlers(socket: Socket) {
	socket.on("joinRoom", (newRoomId: string, callback) => {
		const oldRoomId = socket.data.roomId;
		const success = transferRoom(
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

		if (oldRoomId) {
			socket.leave(oldRoomId);
			const oldRoom = roomStore.get(oldRoomId);
			if (oldRoom) {
				io.to(oldRoomId).emit("roomState", oldRoom);
			}
		}

		socket.join(newRoomId);
		socket.data.roomId = newRoomId;
		callback(true, `Joined room ${newRoomId}`);
		io.to(success.roomId).emit("roomState", success);

		console.log(`${socket.id} joinRoom sucessful: ${newRoomId}`);
	});

	socket.on("leaveRoom", () => {
		const oldRoomId = socket.data.roomId;
		const success = createUniqueRoom();
		if (!success) {
			console.log(`${socket.id} failed to create new unique room`);
			roomStore.deleteUser(socket.data.roomId, socket.id);
			socket.disconnect();
			return;
		}

		const newRoom = transferRoom(oldRoomId, success.roomId, socket.id, socket.data.displayName, socket.data.userId);
		if (!newRoom) {
			console.log(`${socket.id} failed to transfer to new room`);
			socket.disconnect();
			return;
		}

		if (oldRoomId) {
			socket.leave(oldRoomId);
			const oldRoom = roomStore.get(oldRoomId);
			if (oldRoom) {
				io.to(oldRoomId).emit("roomState", oldRoom);
			}
		}

		socket.join(newRoom.roomId);
		socket.data.roomId = newRoom.roomId;
		io.to(success.roomId).emit("roomState", success);

		console.log(`${socket.id} leaveRoom sucessful: ${newRoom.roomId}`);
	});

	socket.on("startGame", async () => {
		const room = roomStore.get(socket.data.roomId);
		if (!room)
			return;
		if (socket.id !== room.roomLeader)
			return;
		console.log(`startGame received from ${socket.id}`);

		room.prompt = createPrompt();
		room.wordCount = room.prompt.length;

		roomStore.setState(room.roomId, RoomState.COUNTDOWN);
		io.to(room.roomId).emit("roomState", room);

		await wait(5000);

		roomStore.setState(room.roomId, RoomState.IN_PROGRESS);
		io.to(room.roomId).emit("roomState", room);

	});
}
