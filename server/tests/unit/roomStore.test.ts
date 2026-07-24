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
	const userId = "user1";
	const displayName = "bob";
	const databaseUserId = 123;

	const roomId = "room1";

	afterAll(async () => {});

	it("get invalid room", async () => {
		expect(roomStore.get(roomId)).toBeUndefined();
	});

	it("create room, get and delete", async () => {
		const roomDataFromCreate: RoomData = roomStore.create(roomId);
		roomStore.addUser(roomId, userId, displayName, databaseUserId);
		expect(roomDataFromCreate.roomId).toBe(roomId);
		expect(roomDataFromCreate.roomLeader).toBe(userId);
		expect(roomDataFromCreate.users).toEqual({
			[userId]: {
				databaseUserId,
				progress: 0,
				displayName,
			},
		});
		expect(roomDataFromCreate.state).toBe(RoomState.LOBBY);
		expect(roomDataFromCreate.createdAt).toBeInstanceOf(Date);

		const roomDataFromGet = roomStore.get(roomId);
		expect(roomDataFromGet).toBeDefined();
		expect(roomDataFromGet?.roomId).toBe(roomId);
		expect(roomDataFromGet?.roomLeader).toBe(userId);
		expect(roomDataFromGet?.users).toEqual({
			[userId]: {
				databaseUserId,
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
	const userId = "user1";
	const displayName = "bob";
	const databaseUserId = 123;

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
			roomStore.addUser(invalidRoomId, userId, displayName, databaseUserId),
		).not.toThrow();
	});

	it("add user to valid room, then delete, then room should also be deleted", async () => {
		// Check room users is empty
		const roomBeforeAdd = roomStore.get(roomId);
		expect(roomBeforeAdd?.users).toEqual({});

		// Add a user to room
		roomStore.addUser(roomId, userId, displayName, databaseUserId);

		// Check room has one user
		const roomAfterAdd = roomStore.get(roomId);
		expect(roomAfterAdd?.users).toEqual({
			[userId]: {
				databaseUserId,
				progress: 0,
				displayName,
			},
		});

		// Delete the user from the room
		roomStore.deleteUser(roomId, userId);

		// Check room is delete after last user is deleted
		const roomAfterDelete = roomStore.get(roomId);
		expect(roomAfterDelete).toBeUndefined();
	});

	it("should change roomLeader if current roomLeader leaves", async () => {
		roomStore.addUser(roomId, userId, displayName, databaseUserId);

		const initialRoom = roomStore.get(roomId);
		expect(initialRoom?.roomLeader).toEqual(userId);

		// add the second user
		const secondUserId = "user999";
		const secondDisplayName = "hello";
		const secondDatabaseUserId = 444;
		roomStore.addUser(
			roomId,
			secondUserId,
			secondDisplayName,
			secondDatabaseUserId,
		);

		// Delete the leader
		roomStore.deleteUser(roomId, userId);

		// Expect user to be changed
		expect(initialRoom?.roomLeader).toEqual(secondUserId);

		// Check if only userId is present
		const afterRoom = roomStore.get(roomId);
		expect(afterRoom?.users[secondUserId]).toBeDefined();
		expect(afterRoom?.users[userId]).toBeUndefined();

		// Delete the remaining user
		roomStore.deleteUser(roomId, secondUserId);

		// Check room is delete after last user is deleted
		const roomAfterDelete = roomStore.get(roomId);
		expect(roomAfterDelete).toBeUndefined();
	});
});

describe("updateProgress", () => {
	const userId = "user1";
	const displayName = "bob";
	const databaseUserId = 123;

	const roomId = "room1";

	beforeEach(async () => {
		roomStore.create(roomId);
	});

	afterEach(async () => {
		roomStore.delete(roomId);
	});

	it("Increment user progress", async () => {
		roomStore.addUser(roomId, userId, displayName, databaseUserId);
		const room = roomStore.get(roomId);
		console.log(room);
		expect(room?.users[userId].progress).toEqual(0);

		const secondUserId = "user999";
		const secondDisplayName = "hello";
		const secondDatabaseUserId = 444;
		roomStore.addUser(
			roomId,
			secondUserId,
			secondDisplayName,
			secondDatabaseUserId,
		);
		expect(room?.users[secondUserId].progress).toEqual(0);

		for (let i = 0; i < 10; i++) {
			roomStore.updateProgress(roomId, userId);
			expect(room?.users[userId].progress).toEqual(i + 1);
			expect(room?.users[secondUserId].progress).toEqual(0);
		}
	});
});

describe("updateProgress", () => {
	const userId = "user1";
	const displayName = "bob";
	const databaseUserId = 123;

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
