import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app.js";

// for when not logged in
describe("GET /web/users/me", () => {
	it("returns healthy", async () => {
		const res = await request(app).get("/web/users/me");
		expect(res.status).toBe(401);
		expect(res.text).toContain('"error":"No session token found"');
	});
});



// // for when logged in
// describe("GET /web/users/me", () => {
// 	it("returns healthy", async () => {
// 		const res = await request(app).get("/web/users/me");
// 		expect(res.status).toBe(200);
// 		expect(res.text).toContain("name"); // email, createdAt
// 	});
// });
