import type { User } from "@prisma/client";
import { parse } from "cookie";
import type { Server, Socket } from "socket.io";
import { RoomState } from "../config/socket.js";
import { areAllActivePlayersFinished, createPrompt, createUniqueRoom, finishAndSaveGameIfDone } from "../services/gameService.js";
import { roomStore } from "../services/roomStore.js";
import { getUserFromSession } from "../services/userServices.js";
import { registerGameHandlers } from "./gameHandling.js";
import { registerRoomHandlers } from "./roomHandling.js";
import { saveGameSession } from "../services/gameSessionServices.js";

async function identifySocket(socket: Socket, next: (err?: Error) => void) {
	const cookies = parse(socket.request.headers.cookie || "");
	let user: User | null = null;
	if (cookies.session) {
		try {
			user = await getUserFromSession(cookies.session);
		} catch (err) {
			console.error("Failed to get user from session:", err);
			user = null;
		}
	}
	const displayName: string = socket.handshake.auth.displayName || "";
	if (user) {
		socket.data.userId = user.id;
		socket.data.displayName = user.name;
	} else {
		socket.data.userId = undefined;
		if (displayName) socket.data.displayName = displayName;
		else socket.data.displayName = "Guest";
	}
	next();
}

export function registerSocketHandlers(io: Server) {
	io.use(identifySocket);

	io.on("connection", (socket) => {
		// todo issue #163. this is only temp spectator flag
		socket.data.isSpectator = false;
		if (socket.recovered) {
			console.log(`Recovered: ${socket.id}, room: ${socket.data.roomId}`);
			const recoveredRoom = roomStore.get(socket.data.roomId);
			if (recoveredRoom) {
				if (recoveredRoom.state === RoomState.LOBBY) {
					//add user back to room
					roomStore.addUser(
						recoveredRoom.roomId,
						socket.id,
						socket.data.displayName,
						socket.data.userId,
					);
				} else {
					socket.leave(socket.data.roomId);
					socket.data.roomId = undefined;
				}
			} else {
				socket.leave(socket.data.roomId);
				socket.data.roomId = undefined;
			}
		} else {
			console.log(`Connected: ${socket.id}`);
		}

		let room = roomStore.get(socket.data.roomId);
		if (room === undefined) {
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
			socket.join(newRoom.roomId);
			socket.data.roomId = newRoom.roomId;
			room = roomStore.get(newRoom.roomId);
		}

		if (!room) {
			console.log(
				`Room ${socket.data.roomId} could not be established, disconnecting ${socket.id}`,
			);
			socket.disconnect();
			return;
		}

		registerRoomHandlers(io, socket);
		registerGameHandlers(io, socket);

		//to update client frontend
		io.to(socket.data.roomId).emit("roomState", room);

		socket.on("disconnect", async () => {
			console.log(`Disconnected: ${socket.id}`);
			roomStore.deleteUser(socket.data.roomId, socket.id);

			const room = roomStore.get(socket.data.roomId);
			if (room) {
				finishAndSaveGameIfDone(room);
				io.to(room.roomId).emit("roomState", room);
			}
		});
	});
}
