import { app } from "./app.js";
import express from "express";
import { prisma } from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const port = Number(process.env.PORT ?? 8000);


app.use(express.json());
app.use(requestLogger);
app.use("/api", userRoutes);
app.use("/api", errorHandler);


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
				apiKey: "test-api-key",
			},
		});
		console.log(`Created dummy user: ${user.name}`);
	} else {
		console.log(`Dummy user already exists: ${existing.name}`);
	}
});