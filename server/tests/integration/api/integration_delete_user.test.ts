import { createHash } from "node:crypto";
import request from "supertest";
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "vitest";
import { app } from "../../../src/app.js";
import {
	createUserWithRoleAndApiKey,
	deleteUser,
	getUserByEmail,
	getUserWithApiKey,
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

	it("returns 204 and user is deleted", async () => {
		const res = await request(app)
			.delete(mePath)
			.set("Authorization", unhashedApiKey);

		expect(res.status).toBe(204);
		expect(await userExists(email)).toBe(false);
	});

	afterAll(async () => {
		await deleteUser(email);
	});
});

describe("DELETE /api/users/{id} to delete user as admin", () => {
	const userPath = "/api/users";

	const admin_email = "admin@admin.op";
	const admin_name = "Kevin";
	const admin_unhashedPassword = "strongpassword";
	const admin_unhashedApiKey = "strongkey";

	const user_email = "user@user.sv";
	const user_name = "Ted";
	const user_unhashedPassword = "weakpassword";
	const user_unhashedApiKey = "weakkey";

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(
			admin_email,
			admin_name,
			admin_unhashedPassword,
			admin_unhashedApiKey,
			"admin",
		);
	});
	beforeEach(async () => {
		await createUserWithRoleAndApiKey(
			user_email,
			user_name,
			user_unhashedPassword,
			user_unhashedApiKey,
			"user",
		);
	});
	it("returns 204 and user is deleted by the admin", async () => {
		const user = await getUserByEmail(user_email);
		const res = await request(app)
			.delete(`${userPath}/${user?.id}`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(204);
		expect(await userExists(user_email)).toBe(false);
	});
	it("returns 404 if user id does not exist", async () => {
		const res = await request(app)
			.delete(`${userPath}/42424242`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(404);
		expect(await userExists(user_email)).toBe(true);
	});
	it("returns 400 if with trailing chars", async () => {
		const user = await getUserByEmail(user_email);
		const res = await request(app)
			.delete(`${userPath}/${user?.id}abcdef`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(400);
		expect(await userExists(user_email)).toBe(true);
	});
	afterEach(async () => {
		await deleteUser(user_email);
	});
	afterAll(async () => {
		await deleteUser(admin_email);
	});
});

describe("DELETE /api/users/{id}/api-key to delete a users api-key as admin", () => {
	const mePath = "/api/me"
	const userPath = "/api/users";

	const admin_email = "admin@admin.op";
	const admin_name = "Kevin";
	const admin_unhashedPassword = "strongpassword";
	const admin_unhashedApiKey = "strongkey";

	const user_email = "user@user.sv";
	const user_name = "Ted";
	const user_unhashedPassword = "weakpassword";
	const user_unhashedApiKey = "weakkey";

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(
			admin_email,
			admin_name,
			admin_unhashedPassword,
			admin_unhashedApiKey,
			"admin",
		);
	});
	beforeEach(async () => {
		await createUserWithRoleAndApiKey(
			user_email,
			user_name,
			user_unhashedPassword,
			user_unhashedApiKey,
			"user",
		);
	});
	it("returns 204 and api-key is deleted by the admin", async () => {
		let user = await getUserWithApiKey(user_email);
		expect(user?.apiKey).toBeTruthy();
		let res = await request(app)
			.delete(`${userPath}/${user?.id}/api-key`)
			.set("Authorization", admin_unhashedApiKey);
		expect(res.status).toBe(204);

		user = await getUserWithApiKey(user_email);
		expect(user?.apiKey).toBeFalsy();
		res = await request(app)
			.get(mePath)
			.set("Authorization", user_unhashedApiKey);
		expect(res.status).toBe(401);
	});
	it("returns 404 if user id does not exist", async () => {
		const res = await request(app)
			.delete(`${userPath}/42424242/api-key`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(404);
	});
	it("returns 400 for non-number argument", async () => {
		const user = await getUserByEmail(user_email);
		const res = await request(app)
			.delete(`${userPath}/hello/api-key`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(400);
	});
	afterEach(async () => {
		await deleteUser(user_email);
	});
	afterAll(async () => {
		await deleteUser(admin_email);
	});
});
