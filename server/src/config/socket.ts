export enum RoomState {
	LOBBY = "Lobby",
	COUNTDOWN = "Countdown",
	IN_PROGRESS = "InProgress",
	FINISHED = "Finished",
}

export interface RoomUser {
	displayName: string;
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
	joinRoom: (
		roomId: string,
		callback: (success: boolean, message?: string) => void,
	) => void;
	startGame: () => void;
	leaveRoom: () => void;
}

//create a empty map to make typescript happy
export type InterServerEvents = Record<string, never>;

export interface SocketData {
	userId: number | null;
	roomId: string;
	displayName: string;
}
