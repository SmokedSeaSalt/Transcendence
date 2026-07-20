import { Socket } from "socket.io";

export function registerGameHandlers(socket: Socket) {
  socket.on("completedWord", (word: string) => {
	console.log("completedWord: " + word + `reveived from ${socket.id}`);
  });
}