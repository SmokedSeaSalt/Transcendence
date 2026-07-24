import { RoomState } from "../config/socket.js";

export interface userInfo {
	databaseUserId: number | null;
	progress: number;
	displayName: string;
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
	create: (roomId: string): RoomData => {
		const room: RoomData = {
			roomId: roomId,
			roomLeader: "",
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
		if (Object.keys(room.users).length === 0) {
			room.roomLeader = userId;
			console.log(`ROOM LEADER :${room.roomLeader}`);
		}
		// add user to room
		room.users[userId] = {
			displayName: name,
			progress: 0,
			databaseUserId: databaseUserId,
		};
	},

	deleteUser: (roomId: string, userId: string): void => {
		const room = rooms.get(roomId);
		if (!room) return;

		//don't delete user from roomStore in game was already started
		if (
			room.state === RoomState.IN_PROGRESS ||
			room.state === RoomState.COUNTDOWN ||
			room.state === RoomState.FINISHED
		) {
			return;
		}

		//delete user
		delete room.users[userId];

		// if room is now empty, delete the room.
		const roomAfter = rooms.get(roomId);
		if (!roomAfter) return;
		if (roomAfter.users && Object.keys(roomAfter.users).length === 0) {
			roomStore.delete(roomId);
			return;
		}

		// if room leader left, assign a new one
		if (roomAfter.roomLeader === userId) {
			roomAfter.roomLeader = Object.keys(roomAfter.users)[0];
		}
	},

	updateProgress: (roomId: string, userId: string): void => {
		const room = rooms.get(roomId);
		if (!room) return;
		// TODO validate incomming word in gameService if word is correct before calling this funtion
		// to increment progress
		room.users[userId].progress += 1;
	},

	setState: (roomId: string, state: RoomState): void => {
		const room = rooms.get(roomId);
		if (!room) return;
		if (room.state === state) return;
		room.state = state;

		if (state === RoomState.IN_PROGRESS) room.startedAt = new Date();
		if (state === RoomState.FINISHED) room.finishedAt = new Date();
	},

	delete: (roomId: string): void => {
		rooms.delete(roomId);
	},

	// this should not be here but a seperate service that gets a room object.
	// we want to keep this inmemory only, this would need to be a async if this calls the database helper functions
	saveToDatabase: (): void => {
		// transform data
		// call functions in gameService to create the gameSession and GameResult database entries
	},
};
