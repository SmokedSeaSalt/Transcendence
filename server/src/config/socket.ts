export enum RoomState {
	LOBBY = "Lobby",
	COUNTDOWN = "Countdown",
	IN_PROGRESS = "InProgress",
	FINISHED = "Finished",
}

export interface RoomUser {
	displayName: string;
	progress: number;
	invalidCharsTyped: number;
	finishedAt?: Date;
}

export interface RoomStatePayload {
	roomId: string;
	roomLeader: string;
	state: RoomState;
	prompt?: string[];
	wordCount?: number;
	users: Record<string, RoomUser>;
	createdAt: Date;
	startedAt?: Date;
	finishedAt?: Date;
}

export interface ServerToClientEvents {
	roomState: (payload: RoomStatePayload) => void;
}

export interface ClientToServerEvents {
	completedWord: (word: string) => void;
	wrongCharacter: () => void;
	joinRoom: (
		roomId: string,
		asSpectator: boolean,
		callback: (success: boolean, message?: string) => void,
	) => void;
	startGame: () => void;
	leaveRoom: () => void;
}

//create a empty map to make typescript happy
export type InterServerEvents = Record<string, never>;

export interface SocketData {
	userId: number | undefined;
	roomId: string;
	displayName: string;
	isSpectator: boolean;
}
