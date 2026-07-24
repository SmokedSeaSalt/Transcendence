import { createHash } from "node:crypto";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { app } from "../../../src/app.js";
import {
	createUserWithRoleAndApiKey,
	deleteUser,
	getUserByEmail,
} from "../../helpers/dbHelpers.js";

describe("GET /api/users to get a list of all users", () => {
	const usersPath = "/api/users";

	const admin_email = "admin@admin.op";
	const admin_name = "Kevin";
	const admin_unhashedPassword = "strongpassword";
	const admin_unhashedApiKey = "strongkey";

	const user1_email = "user1@user.sv";
	const user1_name = "Tedd";
	const user1_unhashedPassword = "weakpassword";
	const user1_unhashedApiKey = "weakkey1";

	const user2_email = "user2@user.sv";
	const user2_name = "Teddy";
	const user2_unhashedPassword = "weakpassword";
	const user2_unhashedApiKey = "weakkey2";

	const user3_email = "user3@user.sv";
	const user3_name = "Ted";
	const user3_unhashedPassword = "weakpassword";
	const user3_unhashedApiKey = "weakkey3";

	beforeAll(async () => {
		await createUserWithRoleAndApiKey(
			admin_email,
			admin_name,
			admin_unhashedPassword,
			admin_unhashedApiKey,
			"admin",
		);

		await createUserWithRoleAndApiKey(
			user1_email,
			user1_name,
			user1_unhashedPassword,
			user1_unhashedApiKey,
			"user",
		);

		await createUserWithRoleAndApiKey(
			user2_email,
			user2_name,
			user2_unhashedPassword,
			user2_unhashedApiKey,
			"user",
		);

		await createUserWithRoleAndApiKey(
			user3_email,
			user3_name,
			user3_unhashedPassword,
			user3_unhashedApiKey,
			"user",
		);
	});

	it("returns 200 with all users from the database", async () => {
		const res = await request(app)
			.get(usersPath)
			.set("Authorization", admin_unhashedApiKey);
		expect(res.status).toBe(200);
		expect(res.body.length).toBe(4);
	});
	it("returns 403", async () => {
		const res = await request(app)
			.get(usersPath)
			.set("Authorization", user1_unhashedApiKey);
		expect(res.status).toBe(403);
	});
	afterAll(async () => {
		await deleteUser(admin_email);
		await deleteUser(user1_email);
		await deleteUser(user2_email);
		await deleteUser(user3_email);
	});
});

describe("GET /api/users/{id} to get user", () => {
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

		await createUserWithRoleAndApiKey(
			user_email,
			user_name,
			user_unhashedPassword,
			user_unhashedApiKey,
			"user",
		);
	});
	it("Returns 200", async () => {
		const user = await getUserByEmail(user_email);

		const res = await request(app)
			.get(`${userPath}/${user?.id}`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(200);
		expect(res.body.name).toBe(user_name);
		expect(res.body.email).toBe(user_email);
	});
	it("Returns 400", async () => {
		const user = await getUserByEmail(user_email);
		const res = await request(app)
			.get(`${userPath}/hello`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(400);
	});
	it("Returns 403", async () => {
		const user = await getUserByEmail(user_email);

		const res = await request(app)
			.get(`${userPath}/${user?.id}`)
			.set("Authorization", user_unhashedApiKey);

		expect(res.status).toBe(403);
	});
	it("Returns 404", async () => {
		const user = await getUserByEmail(user_email);
		const res = await request(app)
			.get(`${userPath}/42424242`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(404);
	});
	afterAll(async () => {
		await deleteUser(admin_email);
		await deleteUser(user_email);
	});
});
