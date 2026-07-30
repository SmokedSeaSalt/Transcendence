import bcrypt from "bcrypt";
import { prisma } from "../db.js";

export async function createAdminUser() {
	const email = process.env.ADMIN_EMAIL;
	const password = process.env.ADMIN_PASSWORD;

	if (!email || !password) {
		console.log(
			"ADMIN_EMAIL and ADMIN_PASSWORD not set in .env file. Continuing without creating admin user.",
		);
		return;
	}

	const existing = await prisma.user.findUnique({
		where: { email: email },
	});
	if (!existing) {
		const saltRounds: number = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const { user, gameSession, gameResult } = await prisma.$transaction(
			async (tx) => {
				const user = await tx.user.create({
					data: {
						email: email,
						name: "I am very important",
						hashedPassword: hashedPassword,
						role: "admin",
					},
				});

				const gameSession = await tx.gameSession.create({
					data: {
						charCount: 2,
						wordCount: 3,
						textPrompt: "Hello World",
						startedAt: new Date(),
						finishedAt: new Date(),
						players: {
							connect: { id: user.id },
						},
					},
				});

				const gameResult = await tx.gameResult.create({
					data: {
						score: 1,
						wpm: 2,
						cpm: 3,
						accuracy: 4.0,
						timeMs: 5,
						placement: 6,
						finished: true,
						session: {
							connect: { id: gameSession.id },
						},
						user: {
							connect: { id: user.id },
						},
						displayName: "I am very important",
					},
				});

				return { user, gameSession, gameResult };
			},
		);
		console.log(`Created admin user: ${user.name}`);
	} else {
		console.log(`Admin user already exists: ${existing.name}`);
	}
}
