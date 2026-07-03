import request from "supertest";
import { beforeEach, afterAll, describe, expect, it } from "vitest";
import { app } from "../../src/app.js";
import { testClient } from "../vitest.setup.js";

describe("GET /health", () => {
	it("returns healthy", async () => {
		const res = await request(app).get("/health");
		expect(res.status).toBe(200);
		expect(res.text).toContain("healthy");
	});
});

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

describe("POST /api/users/register", () => {
	const email: string = "test@example.com";
	const name: string = "Test User";
	const password: string = "ValidPassword123!";

	beforeEach(async () => {
		await deleteUser(email);
	});

	it("returns 201 created", async () => {

		const res = await request(app)
			.post("/api/users/register")
			.send({
				email: email,
				name: name,
				password: password,
			});

		expect(res.status).toBe(201);
		expect(res.body.email).toBe(email);
		expect(res.body.name).toBe(name);

		//test if actually in database
		const user = await testClient.user.findUnique({
			where: { email: email }
		});

		expect(user).toBeTruthy();
	});

	it("returns 409 conflict", async () => {

		createUser(email, name, password);
		const res = await request(app)
			.post("/api/users/register")
			.send({
				email: email,
				name: name,
				password: password,
			});

		expect(res.status).toBe(409);
	});
	

	it.each([
		"abc",
		"google.com",
		"abc@gmail.a",
		"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@gmail.com",
		"abc def@hotmail.com",
		"A1a!"
	])("returns 400 invalid email", async (email) => {
		const res = await request(app)
			.post("/api/users/register")
			.send({
				email: email,
				name: name,
				password: password,
			});

		expect(res.status).toBe(400);
		expect(res.body.errors[0].msg).not.toHaveLength(0);

	});

	it.each([
		"password",
		"Password",
		"Password1",
		"password1!",
		"PASSWORD1!",
		"A1a!"
	])("returns 400 invalid password", async (password) => {
		const res = await request(app)
			.post("/api/users/register")
			.send({
				email: email,
				name: name,
				password: password,
			});
		expect(res.status).toBe(400);
		expect(res.body.errors[0].msg).not.toHaveLength(0);
	});

	it.each([
		"",
		"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
	])("returns 400 invalid name", async (name) => {
		const res = await request(app)
			.post("/api/users/register")
			.send({
				email: email,
				name: name,
				password: password,
			});
		expect(res.status).toBe(400);
		expect(res.body.errors[0].msg).not.toHaveLength(0);
	});

	afterAll(async () => {
		await deleteUser(email);
	});

});