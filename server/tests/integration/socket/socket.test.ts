import { type Server as HttpServer, createServer } from "http";
import { Server } from "socket.io";
import { io as Client, type Socket } from "socket.io-client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { registerSocketHandlers } from "../../../src/socket/";
import { roomStore } from "../src/roomStore";

describe("socket disconnect", () => {
	let httpServer: HttpServer;
	let ioServer: Server;
	let client1: Socket;
	let client2: Socket;
	let url: string;

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

		roomStore.clear();
	});

	it("removes user from room on disconnect", async () => {
		client1 = Client(url);
		client2 = Client(url);

		await Promise.all([
			new Promise<void>((resolve) => client1.on("connect", resolve)),
			new Promise<void>((resolve) => client2.on("connect", resolve)),
		]);

		client1.emit("join-room", "testRoom");
		client2.emit("join-room", "testRoom");

		// wait for events to process
		await new Promise((r) => setTimeout(r, 50));

		expect(roomStore.getUsers("testRoom")).toHaveLength(2);

		client1.disconnect();

		await new Promise((r) => setTimeout(r, 50));

		expect(roomStore.getUsers("testRoom")).toHaveLength(1);

		expect(roomStore.getUsers("testRoom")).not.toContain(client1.id);
	});
});
