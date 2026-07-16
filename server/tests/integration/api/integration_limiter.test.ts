import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../src/app.js";
import { deleteUser, createUserWithRoleAndApiKey } from "../../helpers/dbHelpers.js";
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } from "../../../src/config/rateLimit.js"


describe("Rate limit should 429 after max requests. GET /me", () => {
	const mePath = "/api/me";

	const email1 = "example@gmail.com";
	const name1 = "bob";
	const unhashedPassword1 = "Password1!";
	const unhashedApiKey1 = "key";

	const email2 = "different@gmail.com";
	const name2 = "someoneelse";
	const unhashedPassword2 = "Password2!";
	const unhashedApiKey2 = "other_key";

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(email1, name1, unhashedPassword1, unhashedApiKey1, "user");
		await createUserWithRoleAndApiKey(email2, name2, unhashedPassword2, unhashedApiKey2, "user");
	});

	it("returns 200 with valid api key", async () => {
		for (let i = 0; i <= RATE_LIMIT_MAX_REQUESTS; i++) {
			const res = await request(app).get(mePath).set("Authorization", unhashedApiKey1);
			if (i == RATE_LIMIT_MAX_REQUESTS) {
				expect(res.status).toBe(429);
			} else {
				expect(res.status).toBe(200);
				expect(res.body.name).toContain(name1);
				expect(res.body.email).toContain(email1);
			}
		}

		// other user shouldn't be rate limited
		const res = await request(app).get(mePath).set("Authorization", unhashedApiKey2);
		expect(res.status).toBe(200);
		expect(res.body.name).toContain(name2);
		expect(res.body.email).toContain(email2);


	});

	afterAll(async () => {
		await deleteUser(email1);
		await deleteUser(email2);
	});
});