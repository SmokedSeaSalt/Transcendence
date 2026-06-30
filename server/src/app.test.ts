import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("GET /server/hello", () => {
	it("returns hello", async () => {
		const res = await request(app).get("/server/hello");
		expect(res.status).toBe(200);
		expect(res.text).toContain("hello");
	});
});
