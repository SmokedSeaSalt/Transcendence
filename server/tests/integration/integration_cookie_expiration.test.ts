import request from "supertest";
import { afterAll, describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import {
	deleteSession,
	deleteUser,
	shortenExpiration,
} from "../helpers/dbHelpers.js";

// check cookie expiration upon creation & over time
describe("test cookie expiration", () => {
	const email = "testcookie@example.com";
	const name = "Test Cookie";
	const password = "ValidPassword123!";
	let currentCookie: string;
	let fullCookieString: string;

	afterAll(async () => {
		await deleteUser(email);
		await deleteSession(currentCookie);
	});

	it("register", async () => {
		const res = await request(app)
			.post("/web/users/register")
			.send({ email, name, password })
			.expect(201);
		fullCookieString = res.headers["set-cookie"];
	});

	it("returns /me info immediately after logging in", async () => {
		const res = await request(app)
			.get("/web/users/me")
			.set("Cookie", fullCookieString)
			.expect(200);
		expect(res.text).toContain(`"name":"${name}"`);
		expect(res.text).toContain(`"email":"${email}"`);
		expect(res.text).toContain(`"createdAt":`);
	});

	it("/me after setting expiration to cookie", async () => {
		currentCookie = fullCookieString[0].slice(8, 72);
		await shortenExpiration(currentCookie);
		const res = await request(app)
			.get("/web/users/me")
			.set("Cookie", fullCookieString)
			.expect(401);
		expect(res.text).toContain('"error":"Expired session token."');
	});
});
