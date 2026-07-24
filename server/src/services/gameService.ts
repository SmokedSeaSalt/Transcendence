//validateIncommingWord(roomId, userId, typedWord);
import { RoomState } from "../config/socket.js";
import { roomStore } from "./roomStore.js";

export function validateIncommingWord(
	roomId: string,
	userId: string,
	typedWord: string,
) {
	const room = roomStore.get(roomId);

	if (!room) {
		return null;
	}
	if (!room.prompt || !room.wordCount) {
		return null;
	}

	const user = room.users[userId];

	// If user already done, return
	if (user.progress >= room.wordCount) {
		return;
	}

	if (typedWord === room.prompt[user.progress]) {
		roomStore.updateProgress(roomId, userId);
	} else {
		console.log(`user: ${userId}, sent an invalid word in room: ${roomId}`)
		return;
	}

	let shouldTerminate = true;
	// If the user typed the final word, check if all others are done as well
	if (user.progress === room.wordCount) {
		for (const user of Object.values(room.users)) {
			if (user.progress !== room.wordCount) {
				shouldTerminate = false;
				break;
			}
		}
	}

	if (shouldTerminate) {
		roomStore.setState(roomId, RoomState.FINISHED);
	}


	return room;
}
