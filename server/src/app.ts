import express from "express";


import { prisma } from "./db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import apiRoutes from "./routes/api/index.js";
import webRoutes from "./routes/web/index.js";


export const app = express();

app.use(express.json());


app.use(requestLogger);
app.use("/api", apiRoutes);
app.use("/web", webRoutes);

// Health check endpoint
// todo: Place before authentication so monitoring can access it
app.get("/health", (req, res) => {
	res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.use(errorHandler);
