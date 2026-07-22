import { httpServer } from "./app.js";
import { createAdminUser } from "./config/dbSeed.js";

const port = Number(process.env.PORT ?? 8000);

httpServer.listen(port, async () => {
	console.log(`Server listening on http://localhost:${port}`);

	await createAdminUser();
});
