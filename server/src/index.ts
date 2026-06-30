import { app } from "./app.js";
import { prisma } from "./db.js";

const port = Number(process.env.PORT ?? 8000);

app.listen(port, async () => {
	console.log(`Server listening on http://localhost:${port}`);

	// create dummy user to test database
	const existing = await prisma.user.findUnique({
		where: { email: "test@test.com" },
	});

	if (!existing) {
		const user = await prisma.user.create({
			data: {
				email: "test@test.com",
				name: "Test User",
				hashedPassword: "hashed",
				apiKey: "test-api-key",
			},
		});
		console.log(`Created dummy user: ${user.name}`);
	} else {
		console.log(`Dummy user already exists: ${existing.name}`);
	}
});
