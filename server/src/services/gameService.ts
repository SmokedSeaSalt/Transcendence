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
