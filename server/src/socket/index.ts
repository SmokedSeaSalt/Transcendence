import type { User } from "@prisma/client";
import { parse } from "cookie";
import type { Server } from "socket.io";
import { createUniqueRoom } from "../services/gameService.js";
import { roomStore } from "../services/roomStore.js";
import { getUserFromSession } from "../services/userServices.js";
import { registerGameHandlers } from "./gameHandling.js";
import { registerRoomHandlers } from "./roomHandling.js";

export function registerSocketHandlers(io: Server) {
	io.on("connection", async (socket) => {
		console.log(`Connected: ${socket.id}`);

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

		const room = createUniqueRoom();
		if (!room) {
			//disconnect client
			console.log("Error while creating unique room.");
			socket.disconnect();
			return;
		}

		roomStore.addUser(
			room.roomId,
			socket.id,
			socket.data.displayName,
			socket.data.userId,
		);
		socket.join(room.roomId);
		socket.data.roomId = room.roomId;

		// todo Temporary test code
		room.prompt = [
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
			"test",
		];
		room.wordCount = 15;
		// end of tempororay test code

		registerRoomHandlers(io, socket);
		registerGameHandlers(io, socket);

		//to update client frontend
		io.to(room.roomId).emit("roomState", room);

		socket.on("disconnect", () => {
			console.log(`Disconnected: ${socket.id}`);
			roomStore.deleteUser(socket.data.roomId, socket.id);
		});
	});
}
