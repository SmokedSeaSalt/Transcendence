import { RoomState } from "../config/socket.js";

export interface userInfo {
	userId: number | null;
	progress: number;
	displayName: string;
	finishedAt?: Date;
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
		socketId: string,
		name: string,
		userId: number | null,
	): void => {
		const room = rooms.get(roomId);
		if (!room) return;
		if (Object.keys(room.users).length === 0) {
			room.roomLeader = socketId;
			console.log(`ROOM LEADER :${room.roomLeader}`);
		}
		// add user to room
		room.users[socketId] = {
			displayName: name,
			progress: 0,
			userId: userId,
		};
	},

	deleteUser: (roomId: string, socketId: string): void => {
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
		delete room.users[socketId];

		// if room is now empty, delete the room.
		const roomAfter = rooms.get(roomId);
		if (!roomAfter) return;
		if (roomAfter.users && Object.keys(roomAfter.users).length === 0) {
			roomStore.delete(roomId);
			return;
		}

		// if room leader left, assign a new one
		if (roomAfter.roomLeader === socketId) {
			roomAfter.roomLeader = Object.keys(roomAfter.users)[0];
		}
	},

	updateProgress: (roomId: string, socketId: string): void => {
		const room = rooms.get(roomId);
		if (!room) return;
		room.users[socketId].progress += 1;
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
