import { Server } from "socket.io";
import { registerRoomHandlers } from "./roomHandling.js";
import { registerGameHandlers } from "./gameHandling.js";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);

    registerRoomHandlers(socket);
    registerGameHandlers(socket);

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });
}