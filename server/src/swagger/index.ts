import swaggerJsdoc from "swagger-jsdoc";
import { userSchemas } from "./schemas/userSchemas.js";

const externalPort = Number(process.env.EXTERNAL_PORT ?? 8443)

const options: swaggerJsdoc.Options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Transcendence Public API",
			version: "1.0.0",
			description: "Express API documentation",
		},
		components: {
			schemas: {
				...userSchemas,
			},
		},
		servers: [
			{
				url: `http://localhost:${externalPort}/api`,
			},
		],
	},
	apis: [
		"./src/routes/**/*.ts",
	],
};

export const swaggerSpec = swaggerJsdoc(options);