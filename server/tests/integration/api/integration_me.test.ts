import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../src/app.js";
import { createUser, deleteUser, createApiKey } from "../../helpers/dbHelpers.js";
import { createHash } from "node:crypto";


describe("GET /me", () => {
	const mePath = "/api/me";
	it("returns 401 unauthorized", async () => {
		const res = await request(app).get(mePath);
		expect(res.status).toBe(401);
		expect(res.text).toContain("No token provided");
	});

	it("returns 200 with valid api key", async () => {
		const email = "example@gmail.com";
		const name = "bob";
		const password = "Password1!";
		const mockApiKey = "key";
		const hashedKey = await createHash("sha256").update(mockApiKey).digest("hex");
		const user = await createUser(email, name, password);

		await createApiKey(hashedKey, "user", user.id, new Date(Date.now() + 60 * 60 * 1000));



		const res = await request(app).get(mePath).set("Authorization", mockApiKey);
		expect(res.status).toBe(200);
		expect(res.body.name).toContain(name);
		expect(res.body.email).toContain(email);



		await deleteUser(email);

	});
});