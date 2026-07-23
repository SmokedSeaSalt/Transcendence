import { RoomState } from "../config/socket.js";

export interface userInfo {
	databaseUserId: number | null;
	progress: number;
	displayname: string;
}

export interface RoomData {
	roomId: string;
	roomLeader: string;
	state: RoomState;
	prompt?: string[];
	wordCount?: number;
	users: Record<string, userInfo>;
	createdAt: Date;
	startedAt?: Date;
	finishedAt?: Date;
}

const rooms = new Map<string, RoomData>();

export const roomStore = {
	create: (roomId: string, userId: string): RoomData => {
		const room: RoomData = {
			roomId: roomId,
			roomLeader: userId,
			users: {},
			state: RoomState.LOBBY,
			createdAt: new Date(),
		};
		rooms.set(roomId, room);
		return room;
	},

	get: (roomId: string): RoomData | undefined => {
		return rooms.get(roomId);
	},

	addUser: (
		roomId: string,
		userId: string,
		name: string,
		databaseUserId: number | null,
	): void => {
		const room = rooms.get(roomId);
		if (!room) return;
		// add user to room
		room.users[userId] = {
			displayname: name,
			progress: 0,
			databaseUserId: databaseUserId,
		};
	},

	deleteUser: (roomId: string, userId: string): void => {
		const room = rooms.get(roomId);
		if (!room) return;
		//delete user
		delete room.users[userId];
		// TODO: check if user was roomleader, -> select new one -> if last user delete room
	},

	updateProgress: (roomId: string, userId: string): void => {
		const room = rooms.get(roomId);
		if (!room) return;
		// TODO validate incomming word in gameService if word is correct
		//increment progress
		room.users[userId].progress += 1;
	},

	setState: (roomId: string, state: RoomState): void => {
		const room = rooms.get(roomId);
		if (!room) return;
		room.state = state;
		if (state === RoomState.IN_PROGRESS) room.startedAt = new Date();
		if (state === RoomState.FINISHED) room.finishedAt = new Date();
	},

	delete: (roomId: string): void => {
		rooms.delete(roomId);
	},

	saveToDatabase: (): void => {
		// transform data
		// call functions in gameService to create the gameSession and GameResult database entries
	},
};
