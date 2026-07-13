import "./swagger/openapi.js";

import express from "express";
import swaggerUi from "swagger-ui-express";

import { prisma } from "./db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import apiRoutes from "./routes/api/index.js";
import webRoutes from "./routes/web/index.js";

// This import must be after apiRoutes is imported as it is dependent on it.
import { getApiSwaggerSpec } from "./swagger/apiSpec.js";

import { getWebSwaggerSpec } from "./swagger/webSpec.js";


export const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(getApiSwaggerSpec()));
app.use("/api", apiRoutes);

if (process.env.NODE_ENV === "development") {
	app.use("/web/docs", swaggerUi.serve, swaggerUi.setup(getWebSwaggerSpec()));
}
app.use("/web", webRoutes);

console.log("NODE_ENV:", process.env.NODE_ENV);

// Health check endpoint
// todo: Place before authentication so monitoring can access it
app.get("/health", (req, res) => {
	res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.use(errorHandler);
