import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { updateSession } from "../../src/services/sessionServices.js";
import { createUser, deleteUser } from "../helpers/dbHelpers.js";
import { prisma } from "../../src/db.js";
import type { Session, User } from "@prisma/client";

//token generation
describe("create session for user", () => {
	const email = "test@example.com";
	const name = "Test User";
	const password = "ValidPassword123!";

	let user: User;

    beforeAll(async () => {
        user = await createUser(email, name, password);
    });

    afterAll(async () => {
        await deleteUser(email);
    });

	it("returns token", async () => {
		const tokenRet = await updateSession(user);
		expect(tokenRet).toHaveLength(64);
		const session: Session = await prisma.session.findUnique({
			where: {userId: user.id},
		});
		expect(session).toBeTruthy();
	});

	it("second token is different", async () => {
		const tokenRet = await updateSession(user);
		expect(tokenRet).toHaveLength(64);
		const tokenRet2 = await updateSession(user);
		expect(tokenRet != tokenRet2);
	});
});



