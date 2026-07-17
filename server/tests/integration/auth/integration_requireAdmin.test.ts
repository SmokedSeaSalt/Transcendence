import { createHash } from "node:crypto";
import request from "supertest";
import { afterEach, describe, expect, it } from "vitest";
import { app } from "../../../src/app.js";
import {
	createApiKey,
	createUser,
	createUserWithRoleAndApiKey,
	deleteUser,
} from "../../helpers/dbHelpers.js";

describe("requireAdmin middleware", () => {
	const registerUserRoute = "/api/users/register";

	const email = "testAdmin@example.com";
	const name = "Test Admin User";
	const password = "ValidPassword123!";
	const unhashedApiKey = "key";

	it("rejects non-admin users", async () => {
		await createUserWithRoleAndApiKey(
			email,
			name,
			password,
			unhashedApiKey,
			"user",
		);
		const res = await request(app)
			.delete(registerUserRoute)
			.set("Authorization", unhashedApiKey);

		expect(res.status).toBe(403);
		expect(res.text).toContain("Admin access required");
	});

	it("allows admin users", async () => {
		await createUserWithRoleAndApiKey(
			email,
			name,
			password,
			unhashedApiKey,
			"admin",
		);
		const res = await request(app)
			.post(registerUserRoute)
			.set("Authorization", unhashedApiKey)
			.send({ email: "new@gmail.com", name: "jon", password: "Password1!" });

		expect(res.status).toBe(201);
	});

	afterEach(async () => {
		await deleteUser(email);
	});
});
