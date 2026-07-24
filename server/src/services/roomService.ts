import { roomStore } from "./roomStore.js";

export function joinRoom(
	roomId: string,
	userId: string,
	name: string,
	databaseUserId: number | null,
) {
	const room = roomStore.get(roomId);

	if (!room) {
		return null;
	}

	roomStore.addUser(roomId, userId, name, databaseUserId);

	return room;
}
