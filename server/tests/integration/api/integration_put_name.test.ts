import { createHash } from "node:crypto";
import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../src/app.js";
import {
	createUserWithRoleAndApiKey,
	deleteUser,
	getUserByEmail,
	userExists,
} from "../../helpers/dbHelpers.js";

describe("PUT /api/me to update name", () => {
	const mePath = "/api/me";

	const email = "example@gmail.com";
	const name = "bob";
	const unhashedPassword = "Password1!";
	const unhashedApiKey = "key";

	const newName = "tom";
	const body = { name: newName };

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(
			email,
			name,
			unhashedPassword,
			unhashedApiKey,
			"admin",
		);
	});

	it("returns 204 with valid api key", async () => {
		const res = await request(app)
			.put(mePath)
			.send(body)
			.set("Authorization", unhashedApiKey);
		console.log("0------------------------");

		expect(res.status).toBe(204);
		const user = await getUserByEmail(email);
		expect(user?.name === newName);
		console.log("2------------------------");
	});

	it("returns 400 with valid api key with invalid body", async () => {
		const res = await request(app)
			.put(mePath)
			.send({ age: "42" })
			.set("Authorization", unhashedApiKey);
		expect(res.status).toBe(400);
	});

	/// todo: these 401 cases should be deleted and it should be tested in auth middleware tests
	it("returns 401 unauthorized without API key", async () => {
		const res = await request(app).put(mePath).send(body);

		expect(res.status).toBe(401);
		expect(res.text).toContain("No API key provided");
	});

	it("returns 401 unauthorized with invalid API key", async () => {
		const res = await request(app)
			.put(mePath)
			.send(body)
			.set("Authorization", `${unhashedApiKey}123abc`);
		expect(res.status).toBe(401);
		expect(res.text).toContain("Invalid API key");
	});

	afterAll(async () => {
		await deleteUser(email);
	});
});
