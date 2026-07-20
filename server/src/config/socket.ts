export enum RoomState {
  LOBBY = "Lobby",
  COUNTDOWN = "Countdown",
  IN_PROGRESS = "InProgress",
  FINISHED = "Finished",
}

export interface RoomUser {
  name: string;
  progress: number;
}

export interface RoomStatePayload {
  roomId: string;
  roomLeader: string;
  state: RoomState;
  prompt: string;
  wordCount: number;
  users: Record<number, RoomUser>;
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

export interface InterServerEvents {}

export interface SocketData {
  userId: number | null;
  roomId: string;
  displayName: string;
}