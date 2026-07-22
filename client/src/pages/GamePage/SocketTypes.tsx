export enum RoomState {
	LOBBY = "Lobby",
	COUNTDOWN = "Countdown",
	IN_PROGRESS = "InProgress",
	FINISHED = "Finished",
}

export interface RoomUser {
	displayname: string;
	progress: number;
}

export interface RoomStatePayload {
	roomId: string;
	roomLeader: string;
	state: RoomState;
	prompt?: string[];
	wordCount?: number;
	users: Record<number, RoomUser>;
	createdAt: Date;
	startedAt?: Date;
	finishedAt?: Date;
}

export interface ServerToClientEvents {
	roomState: (payload: RoomStatePayload) => void;
}

export interface ClientToServerEvents {
	completedWord: (word: string) => void;
	joinRoom: (roomId: string) => void;
	startGame: () => void;
	leaveRoom: () => void;
}
