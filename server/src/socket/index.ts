import type { Server } from "socket.io";
import { roomStore } from "../services/roomStore.js";
import { registerGameHandlers } from "./gameHandling.js";
import { registerRoomHandlers } from "./roomHandling.js";
import { parse } from "cookie";
import { getUserFromSession } from "../services/userServices.js";

export function registerSocketHandlers(io: Server) {
	io.on("connection", async (socket) => {
		console.log(`Connected: ${socket.id}`);

		const cookies = parse(socket.request.headers.cookie || "");
		let user;
		if (cookies["session"]) {
			try {
				user = await getUserFromSession(cookies["session"]);
			} catch (err) {
				console.error("Failed to get user from session:", err);
				user = null;
			}
		}
		const displayName: string = (socket.handshake.auth.displayName || "");
		if (user)
		{
			socket.data.userId = user.id;
			socket.data.displayName = user.name;
		} else {
			socket.data.userId = null;
			if (displayName)
				socket.data.displayName = displayName;
			else
				socket.data.displayName = "Guest";
		}

		//create new room
		//add client to room (socket and roomstore) and set socket.data

		// temporary example/test code
		if (roomStore.get("testRoom") === undefined)
			roomStore.create("testRoom");
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
