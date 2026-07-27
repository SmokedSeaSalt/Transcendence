import { type Server as HttpServer, createServer } from "node:http";
import { Server } from "socket.io";
import { io as Client, type Socket } from "socket.io-client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { roomStore } from "../../../src/services/roomStore";
import { RoomData } from "../../../src/services/roomStore";
import { registerSocketHandlers } from "../../../src/socket/";

describe("socket disconnect", () => {
	let httpServer: HttpServer;
	let ioServer: Server;
	let client1: Socket;
	let client2: Socket;
	let client1Id: string;
	let client2Id: string;
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

		client1 = Client(url);
		client2 = Client(url);

		await Promise.all([
			new Promise<void>((resolve) => client1.on("connect", resolve)),
			new Promise<void>((resolve) => client2.on("connect", resolve)),
		]);

		if (!client1 ||!client2) {
			throw new Error("client is null");
		}

		if (client1.id)
			client1Id = client1.id;
		else
			throw new Error("Clients did not connect");
		if (client2.id)
			client2Id = client2.id;
		else
			throw new Error("Clients did not connect");

		if (!client1Id || !client2Id) {
			throw new Error("Clients did not connect");
		}
	});

	afterEach(() => {
		client1?.disconnect();
		client2?.disconnect();

		ioServer.close();
		httpServer.close();

		roomStore.delete(roomId);
	});
	/* tests: 
		starting room
		moving from one room to another
		leaving the new room and new leader being assigned
	*/
	it("removes user from room on disconnect", async () => {


		const serverSocketUser1 = ioServer.sockets.sockets.get(client1Id);
		const serverSocketUser2 = ioServer.sockets.sockets.get(client2Id);

		// check if user1 is in its own room
		const user1InitialRoomId = serverSocketUser1?.data.roomId;
		const user1InitialRoom = roomStore.get(user1InitialRoomId);
		if (!user1InitialRoom) {
			throw new Error("user1InitialRoom is empty");
		}
		const user1InitialRoomUsers = user1InitialRoom.users;
		expect(Object.keys(user1InitialRoomUsers)).toContain(client1Id); // check in memory store rooms
		expect(
			ioServer.sockets.adapter.rooms.get(user1InitialRoomId)?.has(client1Id),
		).toBe(true); // check socketio rooms

		// check if user2 is in its own room
		const user2InitialRoomId = serverSocketUser2?.data.roomId;
		const user2InitialRoom = roomStore.get(user2InitialRoomId);
		if (!user2InitialRoom) {
			throw new Error("user2InitialRoom is empty");
		}
		const user2InitialRoomUsers = user2InitialRoom.users;
		expect(Object.keys(user2InitialRoomUsers)).toContain(client2Id); // check in memory store rooms
		expect(
			ioServer.sockets.adapter.rooms.get(user2InitialRoomId)?.has(client2Id),
		).toBe(true); // check socketio rooms

		// have the 2 users join the new room
		roomStore.create(roomId);
		await new Promise<void>((resolve) => {
			client1.emit("joinRoom", roomId, (success: boolean) => {
				expect(success).toBe(true);
				resolve();
			});
		});

		await new Promise<void>((resolve) => {
			client2.emit("joinRoom", roomId, (success: boolean) => {
				expect(success).toBe(true);
				resolve();
			});
		});
		// wait for events to process
		await new Promise((r) => setTimeout(r, 50));

		let newRoomUsers = roomStore.get(roomId)?.users;
		if (!newRoomUsers) {
			throw new Error("newRoomUsers is empty");
		}
		// check if user1 left its own room
		expect(roomStore.get(user1InitialRoomId)).toBeUndefined(); // check room has been delete in memory
		expect(
			ioServer.sockets.adapter.rooms.get(user1InitialRoomId),
		).toBeUndefined(); // check room has been deleted in socketio
		// check if user1 has joined the new room
		expect(Object.keys(newRoomUsers)).toContain(client1Id); // check in memory store rooms
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.has(client1Id)).toBe(
			true,
		); // check socketio rooms

		// check if user2 left its own room
		expect(roomStore.get(user2InitialRoomId)).toBeUndefined(); // check room has been delete in memory
		expect(
			ioServer.sockets.adapter.rooms.get(user2InitialRoomId),
		).toBeUndefined(); // check room has been deleted in socketio
		// check if user2 has joined the new room
		expect(Object.keys(newRoomUsers)).toContain(client2Id); // check in memory store rooms
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.has(client2Id)).toBe(
			true,
		); // check socketio rooms

		expect(Object.keys(newRoomUsers)).toHaveLength(2);
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.size).toBe(2);

		expect(roomStore.get(roomId)?.roomLeader).toEqual(client1Id); // check client 1 is room leader

		// Disconnect client1 and check if it is only client 2 in the lobby
		client1.disconnect();

		await new Promise((r) => setTimeout(r, 50));

		newRoomUsers = roomStore.get(roomId)?.users;
		if (!newRoomUsers) {
			throw new Error("newRoomUsers is empty");
		}

		expect(ioServer.sockets.adapter.rooms.get(roomId)?.has(client1Id)).toBe(
			false,
		);
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.has(client2Id)).toBe(
			true,
		);
		expect(ioServer.sockets.adapter.rooms.get(roomId)?.size).toBe(1);

		expect(Object.keys(newRoomUsers)).toHaveLength(1);
		expect(Object.keys(newRoomUsers)).not.toContain(client1.id);

		expect(roomStore.get(roomId)?.roomLeader).toEqual(client2Id); // check client 2 is now room leader
	});
});
