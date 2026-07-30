import { roomStore } from "./roomStore.js";

export function transferRoom(
	oldRoomId: string,
	newRoomId: string,
	socketId: string,
	name: string,
	userId: number | undefined,
) {
	const room = roomStore.get(newRoomId);

	if (!room) {
		return null;
	}

	roomStore.deleteUser(oldRoomId, socketId);
	roomStore.addUser(newRoomId, socketId, name, userId);

	return room;
}
