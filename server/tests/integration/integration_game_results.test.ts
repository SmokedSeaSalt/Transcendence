import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import { prisma } from "../../src/db.js";
import {
	createUserWithRoleAndApiKey,
	deleteUser,
} from "../helpers/dbHelpers.js";

describe("/web/me/gameResults", async () => {
	const gameResultsPath = "/web/me/gameResults";
	const email = "test@example.com";
	const name = "Test User";
	const password = "ValidPassword123!";
	let currentCookie: string;

	it("register", async () => {
		const res = await request(app)
			.post("/web/users/register")
			.send({ email, name, password })
			.expect(201);
		currentCookie = res.headers["set-cookie"];
	});

	it("Returns 200 with an empty array", async () => {
		const res = await request(app)
			.get(gameResultsPath)
			.set("Cookie", currentCookie);

		expect(res.status).toBe(200);
		expect(res.body).toStrictEqual([]);
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
			},
		});

		const res = await request(app)
			.get(gameResultsPath)
			.set("Cookie", currentCookie);

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0]).toMatchObject({
			score: 100,
			wpm: 60,
			cpm: 300,
			accuracy: 98.5,
			timeMs: 12000,
			placement: 1,
			finished: true,
		});
	});
	afterAll(async () => {
		await deleteUser(email);
	});
});
