import type { Server, Socket } from "socket.io";
import { RoomState } from "../config/socket.js";
import {
	finishAndSaveGameIfDone,
	validateIncomingWord,
} from "../services/gameService.js";
import { endGame } from "./gameLifecycle.js";

export function registerGameHandlers(io: Server, socket: Socket) {
	socket.on("completedWord", async (typedWord: string) => {
		if (socket.data.isSpectator) return;

		/* TODO
			- tests are now failing because the test io and the io from the server are both being used.
			So in the tests, users are being added to sockets in the test io. And then the backend checks are being done
			with the server io, which sees that there are no users in io.in(roomId).fetchSockets() and the finish checker
			sees this as everyone is done and the moment one client is done, the check triggers and the game ends.
			- instead of validateIncoming word checking if everyone is complete like this:
				if (user.progress === room.wordCount) {
					user.finishedAt = new Date(Date.now());
					allActivePlayersFinished = await areAllActivePlayersFinished(room);
				}
			do it here in this socket.on(compeltedWord).
			- you can use finishAndSaveGameIfDone after calling validateIncomingWord in this function.
			(also check the endGame parameter "reason: string" make sense, as now finishAndSaveGameIfDone gives the reason that
			somebody left the game )
			- also make sure to pass io finishAndSaveGameIfDone. This func is also used in socket disconnect, leaveRoom and joinRoom
			socketio events to see if there are no remaining 
		*/

		const room = await validateIncomingWord(
			socket.data.roomId,
			socket.id,
			typedWord,
		);
		if (!room || !room.wordCount) return;

		const user = room.users[socket.id];

		//only if player is on last word check if room is finished
		if (user.progress >= room.wordCount) {
			finishAndSaveGameIfDone(room, io);
		}
		io.to(socket.data.roomId).emit("roomState", room);
	});
}
