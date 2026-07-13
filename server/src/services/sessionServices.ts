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
