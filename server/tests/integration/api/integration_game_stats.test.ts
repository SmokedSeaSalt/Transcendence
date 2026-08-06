import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../src/app";
import { prisma } from "../../../src/db";
import {
	createUserWithRoleAndApiKey,
	deleteUser,
} from "../../helpers/dbHelpers";

describe("get /api/me/stats", async () => {
	const statsPath = "/api/me/stats";
	const email = "test@example.com";
	const name = "Test User";
	const unhashedPassword = "ValidPassword123!";
	const unhashedApiKey = "Api";

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(
			email,
			name,
			unhashedPassword,
			unhashedApiKey,
			"user",
		);
	});

	it("Returns 200 with all values at 0", async () => {
		const res = await request(app)
			.get(statsPath)
			.set("Authorization", unhashedApiKey);

		expect(res.status).toBe(200);

		const wins = 0;
		const max_wpm = 0;
		const max_cpm = 0;
		const max_accuracy = 0;
		const average_wpm = 0;
		const average_cpm = 0;
		const average_accuracy = 0;

		expect(res.body).toMatchObject({
			max_wpm,
			max_cpm,
			max_accuracy,
			average_wpm,
			average_cpm,
			average_accuracy,
			wins,
		});
	});
	it("Returns 200 with stats", async () => {
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

		const resultsData = [
			{
				score: 100,
				wpm: 60,
				cpm: 300,
				accuracy: 98.5,
				timeMs: 12000,
				placement: 1,
			},
			{
				score: 80,
				wpm: 45,
				cpm: 220,
				accuracy: 92.0,
				timeMs: 15000,
				placement: 2,
			},
			{
				score: 120,
				wpm: 70,
				cpm: 340,
				accuracy: 99.0,
				timeMs: 11000,
				placement: 1,
			},
		];

		for (const data of resultsData) {
			await prisma.gameResult.create({
				data: {
					...data,
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
		}

		const res = await request(app)
			.get(statsPath)
			.set("Authorization", unhashedApiKey);

		const wins = resultsData.filter((r) => r.placement === 1).length;
		const max_wpm = Math.max(...resultsData.map((r) => r.wpm));
		const max_cpm = Math.max(...resultsData.map((r) => r.cpm));
		const max_accuracy = Math.max(...resultsData.map((r) => r.accuracy));
		const average_wpm =
			resultsData.reduce((sum, r) => sum + r.wpm, 0) / resultsData.length;
		const average_cpm =
			resultsData.reduce((sum, r) => sum + r.cpm, 0) / resultsData.length;
		const average_accuracy =
			resultsData.reduce((sum, r) => sum + r.accuracy, 0) / resultsData.length;

		expect(res.status).toBe(200);
		expect(res.body).toMatchObject({
			max_wpm,
			max_cpm,
			max_accuracy,
			average_wpm,
			average_cpm,
			average_accuracy,
			wins,
		});
	});
	afterAll(async () => {
		await deleteUser(email);
	});
});
