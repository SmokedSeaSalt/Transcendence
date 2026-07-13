import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { registry } from "./registry.js";

const externalPort = Number(process.env.EXTERNAL_PORT ?? 8443);

const generator = new OpenApiGeneratorV3(registry.definitions);

export const swaggerSpec = generator.generateDocument({
	openapi: "3.1.0",

	info: {
		title: "Transcendence API",
		version: "1.0.0",
	},

	servers: [
		{
			url: `http://localhost:${externalPort}/api`,
		},
	],
});