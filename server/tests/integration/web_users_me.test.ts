import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import { deleteUser } from "../helpers/dbHelpers.js";

// when not logged in
describe("GET /web/users/me when guest", () => {
	it("returns correct lack of user info", async () => {
		const res = await request(app).get("/web/users/me");
		expect(res.status).toBe(401);
		expect(res.text).toContain('"error":"No session token found."');
	});
});

// when logged in
describe("register, then find /me", () => {
	const email = "test@example.com";
	const name = "Test User";
	const password = "ValidPassword123!";
	let currentCookie: string;

	afterAll(async () => {
		await deleteUser(email);
	});

	it("register", async () => {
		const res = await request(app)
			.post("/web/users/register")
			.send({ email, name, password })
			.expect(201);
		currentCookie = res.headers["set-cookie"];
	});

	it("returns /me info while logged in", async () => {
		const res = await request(app)
			.get("/web/users/me")
			.set("Cookie", currentCookie)
			.expect(200);
		expect(res.text).toContain(`"name":"${name}"`);
		expect(res.text).toContain(`"email":"${email}"`);
		expect(res.text).toContain(`"createdAt":`);
	});

	it("returns /me when using a non-existent cookie", async () => {
		const res = await request(app)
			.get("/web/users/me")
			.set("Cookie", "fake cookie")
			.expect(401);
		expect(res.text).toContain('"error":"No session token found."');
	});
});
