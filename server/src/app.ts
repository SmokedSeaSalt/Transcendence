import cookieParser from "cookie-parser";
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

import { getDocsSwaggerSpec } from "./swagger/docsSpec.js";

import { createServer } from "node:http";
import { Server } from "socket.io";
import type {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from "./config/socket.js";
import { registerSocketHandlers } from "./socket/index.js";

export const app = express();
export const httpServer = createServer(app);
export const io = new Server<
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData
>(httpServer, {
	path: "/web/socket.io",
	cors: {
		origin: ["http://localhost:5173", "https://admin.socket.io"],
		credentials: true,
	},
});
registerSocketHandlers(io);

// when in dev mode with NODE_ENV=development in the .env file, it will also generate docs for /web endpoints in addition to /api endpoints
const isDev = process.env.NODE_ENV === "development";
app.use(
	"/api/docs",
	swaggerUi.serve,
	swaggerUi.setup(isDev ? getDocsSwaggerSpec() : getApiSwaggerSpec()),
);

if (isDev) {
	//runtime import so this can be a dev dependency
	const { instrument } = await import("@socket.io/admin-ui");
	instrument(io, {
		auth: false,
		mode: "development",
	});
}

app.use(cookieParser());
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
