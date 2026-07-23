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
	createApiKey,
	createUser,
	createUserWithRoleAndApiKey,
	deleteUser,
	getUserByEmail,
} from "../../helpers/dbHelpers.js";

describe("GET /me", () => {
	const mePath = "/api/me";

	it("returns 200 with valid api key", async () => {
		const email = "example@gmail.com";
		const name = "bob";
		const unhashedPassword = "Password1!";
		const unhashedApiKey = "key";

		// await deleteUser(email);

		const user = await createUserWithRoleAndApiKey(
			email,
			name,
			unhashedPassword,
			unhashedApiKey,
			"user",
		);

		const res = await request(app)
			.get(mePath)
			.set("Authorization", unhashedApiKey);
		expect(res.status).toBe(200);
		expect(res.body.name).toContain(name);
		expect(res.body.email).toContain(email);

		await deleteUser(email);
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
		console.log(user?.id);

		const res = await request(app)
			.get(`${userPath}/${user?.id}`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(200);
		expect(res.body.name).toBe(user_name);
		expect(res.body.email).toBe(user_email);
	});
	it("Returns 404", async () => {
		const user = await getUserByEmail(user_email);
		const res = await request(app)
			.get(`${userPath}/42424242`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(404);
	});
	it("Returns 400", async () => {
		const user = await getUserByEmail(user_email);
		const res = await request(app)
			.get(`${userPath}/hello`)
			.set("Authorization", admin_unhashedApiKey);

		expect(res.status).toBe(400);
	});
	afterAll(async () => {
		await deleteUser(admin_email);
		await deleteUser(user_email);
	});
});
