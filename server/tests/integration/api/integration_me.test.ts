import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../../src/app.js";
import { createUser, deleteUser, createApiKey, createUserWithRoleAndApiKey } from "../../helpers/dbHelpers.js";
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
		const unhashedPassword = "Password1!";
		const unhashedApiKey = "key";


		const user = await createUserWithRoleAndApiKey(email, name, unhashedPassword, unhashedApiKey, "user");

		const res = await request(app).get(mePath).set("Authorization", unhashedApiKey);
		expect(res.status).toBe(200);
		expect(res.body.name).toContain(name);
		expect(res.body.email).toContain(email);



		await deleteUser(email);

	});
});