import { prisma } from "../../src/db.js";
import bcrypt from "bcrypt";
import { createHash } from "node:crypto";

export const deleteUser = async (email: string) => {
	await prisma.user.deleteMany({ where: { email } });
};

export const createUser = async (
	email: string,
	name: string,
	password: string,
) => {
	const user = await prisma.user.create({
		data: {
			email: email,
			name: name,
			hashedPassword: password,
		},
	});
	return user;
};

export const createApiKey = async (
	unhashedKey: string,
	scope: string,
	userId: number,
	expiresAt: Date,
) => {
	const hashedKey = await createHash("sha256").update(unhashedKey).digest("hex");
	const apiKey = await prisma.aPIKey.create({
		data: {
			hashedKey,
			scope,
			userId,
			expiresAt,
		},
	});
	return apiKey;
};

export const createUserWithRoleAndApiKey = async (
	email: string,
	name: string,
	unhashedPassword: string,
	unhashedApiKey: string,
	role: string,
) => {
	const hashedPassword = await bcrypt.hash(unhashedPassword, 1);
	const user = await createUser(email, name, hashedPassword);
	await createApiKey(unhashedApiKey, role, user.id, new Date(Date.now() + 60 * 60 * 1000));
	return user;
}