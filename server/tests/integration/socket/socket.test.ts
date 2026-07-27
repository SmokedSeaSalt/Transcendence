import { type Server as HttpServer, createServer } from "http";
import { Server } from "socket.io";
import { io as Client, type Socket } from "socket.io-client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { registerSocketHandlers } from "../../../src/socket/";
import { roomStore } from "../../../src/services/roomStore";
import { RoomData } from "../../../src/services/roomStore";

describe("socket disconnect", () => {
	let httpServer: HttpServer;
	let ioServer: Server;
	let client1: Socket;
	let client2: Socket;
	let url: string;
	const roomId = "testRoom";

	beforeEach(async () => {
		httpServer = createServer();

		ioServer = new Server(httpServer);

		registerSocketHandlers(ioServer);

		await new Promise<void>((resolve) => {
			httpServer.listen(() => resolve());
		});

		const address = httpServer.address();

		if (!address || typeof address === "string") {
			throw new Error("Failed to get server address");
		}

		url = `http://localhost:${address.port}`;
	});

	afterEach(() => {
		client1?.disconnect();
		client2?.disconnect();

		ioServer.close();
		httpServer.close();

		roomStore.delete(roomId);
	});

	it("removes user from room on disconnect", async () => {
		client1 = Client(url);
		client2 = Client(url);

		await Promise.all([
			new Promise<void>((resolve) => client1.on("connect", resolve)),
			new Promise<void>((resolve) => client2.on("connect", resolve)),
		]);

		client1.emit("joinRoom", roomId);
		client2.emit("joinRoom", roomId);

		// wait for events to process
		await new Promise((r) => setTimeout(r, 50));

		expect(roomStore.get(roomId)?.users).toHaveLength(2);

		client1.disconnect();

		await new Promise((r) => setTimeout(r, 50));

		expect(roomStore.get(roomId)?.users).toHaveLength(1);

		expect(roomStore.get(roomId)?.users).not.toContain(client1.id);
	});
});
