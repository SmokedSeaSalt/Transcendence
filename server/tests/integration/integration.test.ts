import request from "supertest";
import { beforeEach, afterAll, describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import { testClient } from "../vitest.setup.js";

const registerPaths = [
	"/api/users/register",
	"/web/users/register",
] as const;

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

const deleteUser = async (email: string) => {
	await testClient.user.deleteMany({
		where: { email }
	});
}

const createUser = async (email: string, name: string, password: string) => {
	await testClient.user.create({
		data: {
			email: email,
			name: name,
			hashedPassword: password,
			apiKey: "verySecureKey"
		}
	});
}

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

	beforeEach(async () => {
		await deleteUser(email);
	});

	it("returns 201 created", async () => {
		const res = await request(app)
			.post(path)
			.send({ email, name, password });

		expect(res.status).toBe(201);
		expect(res.body.email).toBe(email);
		expect(res.body.name).toBe(name);
	});

	it("returns 409 conflict", async () => {
		await createUser(email, name, password);

		const res = await request(app)
			.post(path)
			.send({ email, name, password });

		expect(res.status).toBe(409);
	});

	it.each(invalidEmails)("returns 400 invalid email: %s", async (badEmail) => {
		const res = await request(app)
			.post(path)
			.send({ email: badEmail, name, password });

		expect(res.status).toBe(400);
		expect(res.body.errors[0].msg).not.toHaveLength(0);
	});

	it.each(invalidPasswords)("returns 400 invalid password: %s", async (badPassword) => {
		const res = await request(app)
			.post(path)
			.send({ email, name, password: badPassword });

		expect(res.status).toBe(400);
		expect(res.body.errors[0].msg).not.toHaveLength(0);
	});

	it.each(invalidNames)("returns 400 invalid name: %s", async (badName) => {
		const res = await request(app)
			.post(path)
			.send({ email, name: badName, password });

		expect(res.status).toBe(400);
		expect(res.body.errors[0].msg).not.toHaveLength(0);
	});
});