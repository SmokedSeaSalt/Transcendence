import { app } from "./app.js";
import { prisma } from "./db.js";
import { updateAPIKey } from "./services/apiKeyServices.js";

const port = Number(process.env.PORT ?? 8000);

app.listen(port, async () => {
	console.log(`Server listening on http://localhost:${port}`);

	const existing = await prisma.user.findUnique({
		where: { email: "test@test.com" },
	});

	if (!existing) {
		const user = await prisma.user.create({
			data: {
				email: "test@test.com",
				name: "Test User",
				hashedPassword: "hashed",
			},
		});
		const apikey = await updateAPIKey(user, "admin");
		console.log(`Created dummy user: ${user.name}`);
		console.log(`With apikey = ${apikey}`);
	} else {
		console.log(`Dummy user already exists: ${existing.name}`);
	}
});
