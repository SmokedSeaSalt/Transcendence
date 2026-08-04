import type { Server } from "socket.io";
import { io } from "../app.js";
import { WORD_LIST, promtSize } from "../config/gameSettings.js";
import { RoomState } from "../config/socket.js";
import { endGame } from "../socket/gameLifecycle.js";
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
	socketId: string,
	typedWord: string,
) {
	const room = roomStore.get(roomId);

	if (!room) {
		return;
	}
	if (room.state !== RoomState.IN_PROGRESS) {
		return;
	}
	if (!room.prompt || !room.wordCount) {
		return;
	}

	const user = room.users[socketId];

	// If user already done, return
	if (user.progress >= room.wordCount) {
		return;
	}

	if (typedWord === room.prompt[user.progress]) {
		roomStore.updateProgress(roomId, socketId);
		console.log(
			`user: ${socketId} typed "${typedWord}" correctly in room: ${roomId}`,
		);
	} else {
		console.log(
			`user: ${socketId}, sent an invalid word "${typedWord}" in room: ${roomId}`,
		);
		return;
	}

	// If the user typed the final word set finished time
	if (user.progress === room.wordCount) {
		user.finishedAt = new Date(Date.now());
	}

	return room;
}

export async function finishAndSaveGameIfDone(room: RoomData, io: Server) {
	if (room.state !== RoomState.IN_PROGRESS) return;

	const allActivePlayersFinished = await areAllActivePlayersFinished(room, io);

	if (allActivePlayersFinished) {
		endGame(
			room.roomId,
			"All active players are done or someone has left and the rest were done typing.",
		);
	}
}

export async function areAllActivePlayersFinished(room: RoomData, io: Server) {
	const activePlayerSocketIds = await getActiveUserSocketIdsFromRoom(
		room.roomId,
		io,
	);
	return isRoomDone(activePlayerSocketIds, room);
}

function isRoomDone(activePlayerSocketIds: Set<string>, room: RoomData) {
	const users = room.users;
	for (const playerSocketId of activePlayerSocketIds) {
		if (users[playerSocketId].progress !== room.wordCount) {
			return false;
		}
	}
	return true;
}

export async function getActiveUserSocketIdsFromRoom(
	roomId: string,
	io: Server,
) {
	const activeSockets = await io.in(roomId).fetchSockets();
	const activePlayerSocketIds = new Set(
		activeSockets
			.filter((socket) => socket.data.isSpectator === false)
			.map((socket) => socket.id),
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
