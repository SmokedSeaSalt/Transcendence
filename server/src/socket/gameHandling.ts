import type { Socket } from "socket.io";
import { io } from "../app.js";
import { roomStore } from "../services/roomStore.js";

export function registerGameHandlers(socket: Socket) {
	socket.on("completedWord", (word: string) => {
		// console.log(`completedWord: ${word} reveived from ${socket.id}`);

		// temporary example/test code
		// const room = roomStore.get("testRoom");
		// if (room === undefined) {
		// 	return;
		// }
		// if (room?.wordCount === undefined) room.wordCount = 1;
		// else room.wordCount += 1;

		// temporary test code for progress bar checks
		const room = roomStore.get("testRoom");
		if (room === undefined) {
			return;
		}
		if (room?.wordCount === undefined) room.wordCount = 100; // set this somewhere else
		
		console.log("Trying to update socket id:", socket.id);
		roomStore.updateProgress(room.roomId, socket.id);

		// console.log(`current wordCount for room testRoom = ${room.wordCount}`);
		io.to("testRoom").emit("roomState", room);
		//todo dont emit the full room object, it has database user references.
		//todo we should create a Data Transfer Object to filter extra info out.
		// end temporary example/test code
	});
}
