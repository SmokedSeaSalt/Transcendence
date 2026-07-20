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

describe("DELETE /api/me to delete user", () => {
	const mePath = "/api/me";

	const email = "deleteme@gmail.com";
	const name = "bob";
	const unhashedPassword = "Password1!";
	const unhashedApiKey = "key";

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(
			email,
			name,
			unhashedPassword,
			unhashedApiKey,
			"user",
		);
	});

	it("returns 204", async () => {
		const res = await request(app)
			.delete(mePath)
			.set("Authorization", unhashedApiKey);

		expect(res.status).toBe(204);
	});

	afterAll(async () => {
		await deleteUser(email);
	});
});
