import { io } from "../app.js";
import { WORD_LIST, promtSize } from "../config/gameSettings.js";
import { RoomState } from "../config/socket.js";
import { saveGameSession } from "./gameSessionServices.js";
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

export async function validateIncomingWord(
	roomId: string,
	userId: string,
	typedWord: string,
) {
	const room = roomStore.get(roomId);

	if (!room) {
		return null;
	}
	if (room.state !== RoomState.IN_PROGRESS) {
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
		console.log(
			`user: ${userId} typed "${typedWord}" correctly in room: ${roomId}`,
		);
	} else {
		console.log(
			`user: ${userId}, sent an invalid word "${typedWord}" in room: ${roomId}`,
		);
		return;
	}

	let allActivePlayersFinished = false;
	// If the user typed the final word, check if all others are done as well
	if (user.progress === room.wordCount) {
		user.finishedAt = new Date(Date.now());
		const activePlayerSocketIds = await getActiveUserSocketIdsFromRoom(room.roomId);
		console.log(`activePlayerSocketIds size ${activePlayerSocketIds.size}`)
		allActivePlayersFinished = isRoomDone(activePlayerSocketIds, room);

	}

	if (allActivePlayersFinished) {
		roomStore.setState(roomId, RoomState.FINISHED);
		saveGameSession(room);
	}

	return room;
}

function isRoomDone(activePlayerSocketIds: Set<string>, room: RoomData) {
	const users = room.users;
	for (const playerSocketId of activePlayerSocketIds) {
		console.log(`${users[playerSocketId].progress} !== ${room.wordCount} = ${users[playerSocketId].progress !== room.wordCount}`)
		if (users[playerSocketId].progress !== room.wordCount) {
			return false;
		}
	}
	return true;
}

async function getActiveUserSocketIdsFromRoom(roomId: string) {
	const activeSockets = await io.in(roomId).fetchSockets();
	console.log(`active sockets length ${activeSockets.length}`)
	const activePlayerSocketIds = new Set(
		activeSockets
			.filter((socket) => socket.data.isSpectator === undefined)
			.map((socket) => socket.data.roomId)
	);

	return activePlayerSocketIds;
}

function getRandomWords(size: number): string[] {
	const result: string[] = [];
	for (let i = 0; i < size; i++) {
		result.push(WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]);
	}
	return result;
}

export const createPrompt = (): string[] => {
	const prompt = getRandomWords(promtSize);

	return prompt;
};
