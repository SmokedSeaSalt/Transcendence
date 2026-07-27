//validateIncommingWord(roomId, userId, typedWord);

import { type RoomData, roomStore } from "./roomStore.js";

//create a new roomstore room with unique id

export const createUniqueRoom = (): RoomData | null => {
	let roomId = makeid(6);
	let tries = 0;
	while (roomStore.get(roomId)) {
		roomId = makeid(6);
		if (tries > 100) return null;
		tries++;
	}
	const room = roomStore.create(roomId);
	return room;
};

//https://stackoverflow.com/questions/1349404/generate-a-string-of-random-characters
function makeid(length: number) {
	let result = "";
	const characters = "0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
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
		console.log(`user: ${userId}, sent an invalid word in room: ${roomId}`);
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
