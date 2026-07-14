import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { apiRegistry } from "./apiRegistry.js";

const externalPort = Number(process.env.EXTERNAL_PORT ?? 8443);

export function getApiSwaggerSpec() {
	const generator = new OpenApiGeneratorV3(apiRegistry.definitions);

	return generator.generateDocument({
		openapi: "3.1.0",

		info: {
			title: "Transcendence API documentation",
			version: "1.0.0",
		},

		servers: [
			{
				url: `http://localhost:${externalPort}/api`,
			},
		],
	});
}
