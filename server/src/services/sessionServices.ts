import { createHash, randomBytes } from "node:crypto";
import type { User } from "@prisma/client";
import { prisma } from "../db.js";

export const updateSession = async (user: User): Promise<string> => {
	const token = randomBytes(32).toString("hex");
	const hashedToken = createHash("sha256").update(token).digest("hex");

	await prisma.session.upsert({
		where: { userId: user.id },
		update: {
			hashedToken: hashedToken,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			createdAt: new Date(Date.now()),
		},
		create: {
			hashedToken: hashedToken,
			userId: user.id,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		},
	});

	return token;
};

export const invalidateSession = async (token: string) => {
	const hashedToken = createHash("sha256").update(token).digest("hex");
	//does not throw if it can't find the session, which is fine, then it is already gone
	await prisma.session.deleteMany({ where: { hashedToken } });

	return;
};

// returns the expiration date based on session, or null
export const getSessionExpirationDate = async (
	sessionToken: string,
): Promise<Date | null> => {
	const sessionHashedToken = createHash("sha256")
		.update(sessionToken)
		.digest("hex");
	try {
		const sessionWithToken = await prisma.session.findUnique({
			where: { hashedToken: sessionHashedToken },
			select: {
				expiresAt: true,
			},
		});
		if (sessionWithToken == null) {
			console.log("No session found with current token.");
			return null;
		}
		return sessionWithToken.expiresAt;
	} catch {
		console.log(
			"getSessionExpirationDate: threw error searching prisma sessions",
		);
		return null;
	}
};
