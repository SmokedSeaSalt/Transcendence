import bcrypt from "bcrypt";
import { prisma } from "../db.js";

export async function createAdminUser() {
	const email = process.env.ADMIN_EMAIL;
	const password = process.env.ADMIN_PASSWORD;
	const name = process.env.ADMIN_NAME;

	if (!email || !password || !name) {
		console.log(
			"ADMIN_EMAIL, ADMIN_PASSWORD or ADMIN_NAME not set in .env file. Continuing without creating admin user.",
		);
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
				name: name,
				hashedPassword: hashedPassword,
				role: "admin",
			},
		});
		console.log(`Created admin user: ${user.name}`);
	} else {
		console.log(`Admin user already exists: ${existing.name}`);
	}
}
