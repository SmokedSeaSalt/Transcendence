import { prisma } from "../../src/db.js";

export const deleteUser = async (email: string) => {
	await prisma.user.deleteMany({ where: { email } });
};

export const createUser = async (email: string, name: string, password: string) => {
	const user = await prisma.user.create({
		data: {
			email: email,
			name: name,
			hashedPassword: password,
		},
	});
	return user;
};