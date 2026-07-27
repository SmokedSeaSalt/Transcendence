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
	const roomId = "thisIsADifferentRoom";

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

		if (roomStore.get("testRoom") === undefined) roomStore.create("testRoom");

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

		const client1Id = client1.id;
		const client2Id = client2.id;

		if (!client1Id || !client2Id) {
			throw new Error("Clients did not connect");
		}

		roomStore.create(roomId);

		await Promise.all([
			new Promise<void>((resolve) => {
				client1.emit("joinRoom", roomId, (success: boolean) => {
					expect(success).toBe(true);
					resolve();
				});
			}),
			new Promise<void>((resolve) => {
				client2.emit("joinRoom", roomId, (success: boolean) => {
					expect(success).toBe(true);
					resolve();
				});
			}),
		]);

		// wait for events to process
		await new Promise((r) => setTimeout(r, 50));

		let users = roomStore.get(roomId)!.users

		expect(Object.keys(users)).toHaveLength(2);

		expect(ioServer.sockets.adapter.rooms.get(roomId)?.has(client1Id)).toBe(true);
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.has(client2Id)).toBe(true);
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.size).toBe(2);



		client1.disconnect();

		await new Promise((r) => setTimeout(r, 50));

		users = roomStore.get(roomId)!.users

		expect(ioServer.sockets.adapter.rooms.get(roomId)?.has(client1Id)).toBe(false);
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.has(client2Id)).toBe(true);
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.size).toBe(1);

		expect(Object.keys(users)).toHaveLength(1);

		expect(Object.keys(users)).not.toContain(client1.id);
	});
});
