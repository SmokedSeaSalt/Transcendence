import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../src/app";
import { prisma } from "../../../src/db";
import {
	createUserWithRoleAndApiKey,
	deleteUser,
} from "../../helpers/dbHelpers";

describe("get /api/me/gameHistory", async () => {
	const gameHistoryPath = "/api/me/gameHistory";
	const email = "test@example.com";
	const name = "Test User";
	const unhashedPassword = "ValidPassword123!";
	const unhashedApiKey = "key";

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(
			email,
			name,
			unhashedPassword,
			unhashedApiKey,
			"user",
		);
	});

	it("Returns 200 with an empty array", async () => {
		const res = await request(app)
			.get(gameHistoryPath)
			.set("Authorization", unhashedApiKey);

		expect(res.status).toBe(200);
		expect(res.body).toStrictEqual({ gameResults: [] });
	});
	it("Returns 200 with an entry", async () => {
		const user = await prisma.user.findUniqueOrThrow({
			where: { email },
		});

		const gameSession = await prisma.gameSession.create({
			data: {
				charCount: 11,
				wordCount: 2,
				textPrompt: "Hello World",
				startedAt: new Date(),
				finishedAt: new Date(),
				players: {
					connect: { id: user.id },
				},
			},
		});

		await prisma.gameResult.create({
			data: {
				score: 100,
				wpm: 60,
				cpm: 300,
				accuracy: 98.5,
				timeMs: 12000,
				placement: 1,
				finished: true,
				session: {
					connect: { id: gameSession.id },
				},
				user: {
					connect: { id: user.id },
				},
				displayName: name,
			},
		});

		const res = await request(app)
			.get(gameHistoryPath)
			.set("Authorization", unhashedApiKey);

		expect(res.status).toBe(200);
		expect(res.body.gameResults).toHaveLength(1);
		expect(res.body.gameResults[0]).toMatchObject({
			score: 100,
			wpm: 60,
			cpm: 300,
			accuracy: 98.5,
			timeMs: 12000,
			placement: 1,
			finished: true,
			session: {
				charCount: 11,
				wordCount: 2,
				textPrompt: "Hello World",
			},
			displayName: name,
		});
	});
	it("Returns 401 for missing an apikey", async () => {
		const res = await request(app).get(gameHistoryPath);

		expect(res.status).toBe(401);
	});
	afterAll(async () => {
		await deleteUser(email);
	});
});
