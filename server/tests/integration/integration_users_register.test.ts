import request from "supertest";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import { prisma } from "../../src/db.js";
import { createUser, deleteUser, createUserWithRoleAndApiKey } from "../helpers/dbHelpers.js";

const registerPaths = ["/api/users/register", "/web/users/register"] as const;

const validCases = [
	{ email: "abc@gmail.com", name: "john", password: "ValidPassword123!" },
	{
		email: "helloworld@hotmail.net",
		name: "hello world abcdef",
		password: "!!!!!Aa1",
	},
	{
		email: "mat@yahoo.co",
		name: "m",
		password: "superlong_ValidPassword?123456!",
	},
];

const invalidEmails = [
	"abc",
	"google.com",
	"abc@gmail.a",
	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com",
	"abc def@hotmail.com",
	"A1a!",
];

const invalidPasswords = [
	"password",
	"Password",
	"Password1",
	"password1!",
	"PASSWORD1!",
	"A1a!",
];

const invalidNames = [
	"",
	"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
];

const deleteValidCaseUser = async () => {
	for (const { email } of validCases) {
		await deleteUser(email);
	}
};

const userExists = async (email: string) => {
	const user = await prisma.user.findUnique({ where: { email } });
	return !!user;
};

const postRegister = (path: string, body: object, unhashedApiKey: string) => {
	const req = request(app).post(path).send(body);

	if (path === "/api/users/register") {
		req.set("Authorization", unhashedApiKey);
	}

	return req;
};

describe("GET /health", () => {
	it("returns healthy", async () => {
		const res = await request(app).get("/health");
		expect(res.status).toBe(200);
		expect(res.text).toContain("healthy");
	});
});

describe.each(registerPaths)("POST %s", (path) => {
	const email = "test@example.com";
	const name = "Test User";
	const password = "ValidPassword123!";
	
	const adminEmail = "testAdmin@example.com";
	const adminName = "Test Admin User";
	const adminPassword = "ValidPassword123!";
	const unhashedApiKey = "key";

	beforeAll(async () => {
		const adminUser = await createUserWithRoleAndApiKey(adminEmail, adminName, adminPassword, unhashedApiKey, "admin");
	})

	beforeEach(async () => {
		await deleteValidCaseUser();
	});

	it.each(validCases)(
		"returns 201 created $email",
		async ({ email, name, password }) => {
			const res = await postRegister(path, { email, name, password }, unhashedApiKey);
			
			expect(res.status).toBe(201);
			expect(res.body.email).toBe(email);
			expect(res.body.name).toBe(name);
			if (path === "/web/users/register") {
				expect(res.headers["set-cookie"]).toBeDefined();
				expect(res.headers["set-cookie"][0]).toContain("session");
			}

			expect(
				await userExists(email),
				`User with ${email} has not been added to the database.`,
			).toBeTruthy();
		},
	);

	it("returns 409 conflict", async () => {
		await createUser(email, name, password);

		const res = await postRegister(path, { email, name, password }, unhashedApiKey);


		expect(res.status).toBe(409);
		await deleteUser(email);
	});

	it.each(invalidEmails)("returns 400 invalid email: %s", async (badEmail) => {
		const res = await postRegister(path, { email: badEmail, name, password }, unhashedApiKey);

		expect(res.status).toBe(400);
		expect(res.body.errors[0].message).not.toHaveLength(0);
	});

	it.each(invalidPasswords)(
		"returns 400 invalid password: %s",
		async (badPassword) => {
			const res = await postRegister(path, { email, name, password: badPassword }, unhashedApiKey);

			expect(res.status).toBe(400);
			expect(res.body.errors[0].message).not.toHaveLength(0);
		},
	);

	it.each(invalidNames)("returns 400 invalid name: %s", async (badName) => {
			const res = await postRegister(path, { email, name: badName, password }, unhashedApiKey);


		expect(res.status).toBe(400);
		expect(res.body.errors[0].message).not.toHaveLength(0);
	});

	afterAll(async () => {
		await deleteValidCaseUser();
		await deleteUser(adminEmail);
	});
});


describe("POST /api/users/register with user API key", () => {
	const email = "test@example.com";
	const name = "Test User";
	const password = "ValidPassword123!";
	const unhashedApiKey = "key";

	const emailToCreate = "willFail@example.com";
	const nameToCreate = "Failed User";
	const passwordToCreate = "OtherPassword123!";

	// create regular user
	beforeAll(async () => {
		await createUserWithRoleAndApiKey(email, name, password, unhashedApiKey, "user");
	})

	it("Returns 403 when regular user attempts to POST to admin only endpoint", async () => {
		const res = await postRegister("/api/users/register", { email: emailToCreate, name: nameToCreate, password: passwordToCreate }, unhashedApiKey);
		expect(res.status).toBe(403);
		expect(res.text).toContain("Admin access required");
	});

	afterAll(async () => {
		await deleteUser(email);
	});
});