import { app } from "./app.js";
import { createAdminUser } from "./config/dbSeed.js";
import { updateAPIKey } from "./services/apiKeyServices.js";

const port = Number(process.env.PORT ?? 8000);

app.listen(port, async () => {
	console.log(`Server listening on http://localhost:${port}`);

	createAdminUser();
});
