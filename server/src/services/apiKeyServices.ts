import { createHash, randomBytes } from "node:crypto";
import type { User } from "@prisma/client";
import { prisma } from "../db.js";

export const updateAPIKey = async (user: User): Promise<string> => {
	const apiKey = randomBytes(32).toString("hex");
	const hashedapiKey = createHash("sha256").update(apiKey).digest("hex");

	await prisma.aPIKey.upsert({
		where: { userId: user.id },
		update: {
			hashedKey: hashedapiKey,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			createdAt: new Date(Date.now()),
		},
		create: {
			hashedKey: hashedapiKey,
			userId: user.id,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		},
	});

	return apiKey;
};
