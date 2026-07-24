import type { Server } from "socket.io";
import { roomStore } from "../services/roomStore.js";
import { registerGameHandlers } from "./gameHandling.js";
import { registerRoomHandlers } from "./roomHandling.js";

export function registerSocketHandlers(io: Server) {
	io.on("connection", (socket) => {
		console.log(`Connected: ${socket.id}`);

		// temporary example/test code
		if (roomStore.get("testRoom") === undefined) roomStore.create("testRoom");
		socket.join("testRoom");
		roomStore.addUser("testRoom", socket.id, socket.id, null);
		// end temporary example/test code

		registerRoomHandlers(socket);
		registerGameHandlers(socket);

		socket.on("disconnect", () => {
			console.log(`Disconnected: ${socket.id}`);
			//todo loop throuhg all users rooms. do a roomStore get, if defined delete user
		});
	});
}
