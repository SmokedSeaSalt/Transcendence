import { roomStore } from "./roomStore.js";

export function transferRoom(
	oldRoomId: string,
	newRoomId: string,
	userId: string,
	name: string,
	databaseUserId: number | null,
) {
	const room = roomStore.get(newRoomId);

	if (!room) {
		return null;
	}

	roomStore.deleteUser(oldRoomId, userId);
	roomStore.addUser(newRoomId, userId, name, databaseUserId);

	return room;
}
