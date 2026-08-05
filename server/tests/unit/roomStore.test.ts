import request from "supertest";
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "vitest";
import { app } from "../../src/app.js";
import {
	deleteSession,
	deleteUser,
	shortenExpiration,
} from "../helpers/dbHelpers.js";

import { DatabaseSync } from "node:sqlite";
import { RoomState } from "../../src/config/socket.js";
import { type RoomData, roomStore } from "../../src/services/roomStore.js";

// check cookie expiration upon creation & over time
describe("Room create(), get(), delete", () => {
	const socketId = "user1";
	const displayName = "bob";
	const userId = 123;

	const roomId = "room1";

	afterAll(async () => {});

	it("get invalid room", async () => {
		expect(roomStore.get(roomId)).toBeUndefined();
	});

	it("create room, get and delete", async () => {
		const roomDataFromCreate: RoomData = roomStore.create(roomId);
		roomStore.addUser(roomId, socketId, displayName, userId);
		expect(roomDataFromCreate.roomId).toBe(roomId);
		expect(roomDataFromCreate.roomLeader).toBe(socketId);
		expect(roomDataFromCreate.users).toEqual({
			[socketId]: {
				userId,
				invalidCharsTyped: 0,
				progress: 0,
				displayName,
			},
		});
		expect(roomDataFromCreate.state).toBe(RoomState.LOBBY);
		expect(roomDataFromCreate.createdAt).toBeInstanceOf(Date);

		const roomDataFromGet = roomStore.get(roomId);
		expect(roomDataFromGet).toBeDefined();
		expect(roomDataFromGet?.roomId).toBe(roomId);
		expect(roomDataFromGet?.roomLeader).toBe(socketId);
		expect(roomDataFromGet?.users).toEqual({
			[socketId]: {
				userId,
				invalidCharsTyped: 0,
				progress: 0,
				displayName,
			},
		});
		expect(roomDataFromGet?.state).toBe(RoomState.LOBBY);
		expect(roomDataFromGet?.createdAt).toBeInstanceOf(Date);

		roomStore.delete(roomId);
		const roomDataFromGetAfterDelete = roomStore.get(roomId);
		expect(roomDataFromGetAfterDelete).toBeUndefined();
	});

	it("delete invalid room", async () => {
		expect(() => roomStore.delete(roomId)).not.toThrow();
	});
});

describe("Room addUser() and deleteUser()", () => {
	const socketId = "user1";
	const displayName = "bob";
	const userId = 123;

	const roomId = "room1";

	const invalidRoomId = "invalidRoom";

	beforeEach(async () => {
		roomStore.create(roomId);
	});

	afterEach(async () => {
		roomStore.delete(roomId);
	});

	it("add user to invalid room", async () => {
		expect(() =>
			roomStore.addUser(invalidRoomId, socketId, displayName, userId),
		).not.toThrow();
	});

	it("add user to valid room, then delete, then room should also be deleted", async () => {
		// Check room users is empty
		const roomBeforeAdd = roomStore.get(roomId);
		expect(roomBeforeAdd?.users).toEqual({});

		// Add a user to room
		roomStore.addUser(roomId, socketId, displayName, userId);

		// Check room has one user
		const roomAfterAdd = roomStore.get(roomId);
		expect(roomAfterAdd?.users).toEqual({
			[socketId]: {
				userId,
				invalidCharsTyped: 0,
				progress: 0,
				displayName,
			},
		});

		// Delete the user from the room
		roomStore.deleteUser(roomId, socketId);

		// Check room is delete after last user is deleted
		const roomAfterDelete = roomStore.get(roomId);
		expect(roomAfterDelete).toBeUndefined();
	});

	it("should change roomLeader if current roomLeader leaves", async () => {
		roomStore.addUser(roomId, socketId, displayName, userId);

		const initialRoom = roomStore.get(roomId);
		expect(initialRoom?.roomLeader).toEqual(socketId);

		// add the second user
		const secondsocketId = "user999";
		const secondDisplayName = "hello";
		const seconduserId = 444;
		roomStore.addUser(roomId, secondsocketId, secondDisplayName, seconduserId);

		// Delete the leader
		roomStore.deleteUser(roomId, socketId);

		// Expect user to be changed
		expect(initialRoom?.roomLeader).toEqual(secondsocketId);

		// Check if only socketId is present
		const afterRoom = roomStore.get(roomId);
		expect(afterRoom?.users[secondsocketId]).toBeDefined();
		expect(afterRoom?.users[socketId]).toBeUndefined();

		// Delete the remaining user
		roomStore.deleteUser(roomId, secondsocketId);

		// Check room is delete after last user is deleted
		const roomAfterDelete = roomStore.get(roomId);
		expect(roomAfterDelete).toBeUndefined();
	});
});

describe("updateProgress", () => {
	const socketId = "user1";
	const displayName = "bob";
	const userId = 123;

	const roomId = "room1";

	beforeEach(async () => {
		roomStore.create(roomId);
	});

	afterEach(async () => {
		roomStore.delete(roomId);
	});

	it("Increment user progress", async () => {
		roomStore.addUser(roomId, socketId, displayName, userId);
		const room = roomStore.get(roomId);
		console.log(room);
		expect(room?.users[socketId].progress).toEqual(0);

		const secondsocketId = "user999";
		const secondDisplayName = "hello";
		const seconduserId = 444;
		roomStore.addUser(roomId, secondsocketId, secondDisplayName, seconduserId);
		expect(room?.users[secondsocketId].progress).toEqual(0);

		for (let i = 0; i < 10; i++) {
			roomStore.updateProgress(roomId, socketId);
			expect(room?.users[socketId].progress).toEqual(i + 1);
			expect(room?.users[secondsocketId].progress).toEqual(0);
		}
	});
});

describe("updateProgress", () => {
	const socketId = "user1";
	const displayName = "bob";
	const userId = 123;

	const roomId = "room1";

	beforeEach(async () => {
		roomStore.create(roomId);
	});

	afterEach(async () => {
		roomStore.delete(roomId);
	});

	it("Changes states", async () => {
		const room = roomStore.get(roomId);
		expect(room?.state).toEqual(RoomState.LOBBY);

		roomStore.setState(roomId, RoomState.COUNTDOWN);
		expect(room?.state).toEqual(RoomState.COUNTDOWN);

		roomStore.setState(roomId, RoomState.IN_PROGRESS);
		expect(room?.state).toEqual(RoomState.IN_PROGRESS);

		roomStore.setState(roomId, RoomState.FINISHED);
		expect(room?.state).toEqual(RoomState.FINISHED);
	});
});
