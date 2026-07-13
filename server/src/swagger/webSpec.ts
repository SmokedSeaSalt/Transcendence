import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { webRegistry } from "./webRegistry.js";

const externalPort = Number(process.env.EXTERNAL_PORT ?? 8443);

export function getWebSwaggerSpec() {
	const generator = new OpenApiGeneratorV3(webRegistry.definitions);

	return generator.generateDocument({
		openapi: "3.1.0",

		info: {
			title: "Transcendence WEB documentation",
			version: "1.0.0",
		},

		servers: [
			{
				url: `http://localhost:${externalPort}/web`,
			},
		],
	});
}