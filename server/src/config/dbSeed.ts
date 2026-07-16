import { prisma } from "../db.js";
import bcrypt from "bcrypt";

export async function createAdminUser() {
	const email = process.env.ADMIN_EMAIL;
	const password = process.env.ADMIN_PASSWORD;

	if (!email || !password) {
		console.log("ADMIN_EMAIL and ADMIN_PASSWORD not set in .env file. Continuing without creating admin user.");
		return;
	}

	const existing = await prisma.user.findUnique({
		where: { email: email },
	});
	if (!existing) {
		const saltRounds: number = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const user = await prisma.user.create({
			data: {
				email: email,
				name: "I am very important",
				hashedPassword: hashedPassword,
			},
		});
		console.log(`Created admin user: ${user.name}`);
	} else {
		console.log(`Admin user already exists: ${existing.name}`);
	}
}

