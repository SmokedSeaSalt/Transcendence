import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { RoomState } from "../../../src/config/socket";
import { saveGameSession } from "../../../src/services/gameSessionServices";
import { roomStore } from "../../../src/services/roomStore";
import {
	createUser,
	deleteUser,
	getGameSessionsOfUser,
} from "../../helpers/dbHelpers";

describe("Save gameSession in db", () => {
	const roomId = "thisIsADifferentRoom";

	const email1 = "thisisanewemail@gmail.com";
	const socketId1 = "123abc";
	const name1 = "hello";
	let id1: number;

	const socketId2 = "qwert";
	const name2 = "bob";
	const id2 = undefined;

	beforeEach(async () => {
		roomStore.create(roomId);
		const user = await createUser(email1, name1, "123abc!ABC", "user");
		id1 = user.id;
	});

	afterEach(async () => {
		roomStore.delete(roomId);
		await deleteUser(email1);
	});

	it("save roomData as gameSession in db for one logged in user and one guest", async () => {
		// roomStore.create(roomId);
		const room = roomStore.get(roomId);
		if (!room) throw new Error("Room undefined");

		roomStore.addUser(roomId, socketId1, name1, id1);
		roomStore.addUser(roomId, socketId2, name2, id2);

		room.prompt = ["hello", "world"];
		room.wordCount = 2;

		const users = room.users;

		const now = new Date();

		room.startedAt = new Date(now.getTime() - 2000);

		users[socketId1].progress = 2;
		users[socketId1].finishedAt = new Date(now.getTime() - 1000);

		users[socketId2].progress = 2;
		users[socketId2].finishedAt = new Date(now.getTime());

		roomStore.setState(roomId, RoomState.FINISHED);
		await saveGameSession(room);

		const gameSessionsUser1 = await getGameSessionsOfUser(email1);
		if (!gameSessionsUser1) throw new Error("gameSessionUser1 undefined");
		const gameSession = gameSessionsUser1[0];

		expect(gameSession.charCount).toEqual(11);

		expect(gameSession.finishedAt <= new Date(Date.now())).toBeTruthy();
		expect(gameSession.results[0].wpm).toEqual(120);
		expect(gameSession.results[0].cpm).toEqual(660);
		expect(gameSession.results[0].placement).toEqual(1);
		expect(gameSession.results[0].timeMs).toEqual(1000);

		expect(gameSession.results[1].wpm).toEqual(60);
		expect(gameSession.results[1].cpm).toEqual(330);
		expect(gameSession.results[1].placement).toEqual(2);
		expect(gameSession.results[1].timeMs).toEqual(2000);
	});
});
