import { createHash } from "node:crypto";
import bcrypt from "bcrypt";
import { prisma } from "../../src/db.js";

type Role = "user" | "admin";

export const deleteUser = async (email: string) => {
	await prisma.user.deleteMany({ where: { email } });
};

export const createUser = async (
	email: string,
	name: string,
	password: string,
	role: Role = "user",
) => {
	const user = await prisma.user.create({
		data: {
			email: email,
			name: name,
			hashedPassword: password,
			role: role,
		},
	});
	return user;
};

export const createApiKey = async (
	unhashedKey: string,
	userId: number,
	expiresAt: Date,
) => {
	const hashedKey = createHash("sha256")
		.update(unhashedKey)
		.digest("hex");
	const apiKey = await prisma.aPIKey.create({
		data: {
			hashedKey,
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
	role: Role,
) => {
	const hashedPassword = await bcrypt.hash(unhashedPassword, 1);
	const user = await createUser(email, name, hashedPassword, role);
	await createApiKey(
		unhashedApiKey,
		user.id,
		new Date(Date.now() + 60 * 60 * 1000),
	);
	return user;
};
