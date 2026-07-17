import { createHash } from "node:crypto";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../src/app.js";
import {
	createApiKey,
	createUser,
	createUserWithRoleAndApiKey,
	deleteUser,
} from "../../helpers/dbHelpers.js";

describe("authenticate middleware", () => {

	const mePath = "/api/me";

	const email = "example@gmail.com";
	const name = "bob";
	const unhashedPassword = "Password1!";
	const unhashedApiKey = "key";

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(
			email,
			name,
			unhashedPassword,
			unhashedApiKey,
			"admin",
		);
	});


	it("rejects requests without an API key", async () => {
		const res = await request(app).get(mePath);

		expect(res.status).toBe(401);
		expect(res.text).toContain("No API key provided");
	});

	it("rejects invalid API keys", async () => {
		const res = await request(app)
			.get(mePath)
			.set("Authorization", `${unhashedApiKey}abc123`);

		expect(res.status).toBe(401);
		expect(res.text).toContain("Invalid API key");
	});

	it("allows valid API keys", async () => {
		const res = await request(app)
			.get(mePath)
			.set("Authorization", unhashedApiKey);

		expect(res.status).toBe(200);
	});

	afterAll(async () => {
		await deleteUser(email);
	});
});