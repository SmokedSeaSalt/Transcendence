import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

export const apiRegistry = new OpenAPIRegistry();

apiRegistry.registerComponent("securitySchemes", "ApiKeyAuth", {
	type: "apiKey",
	in: "header",
	name: "Authorization",
	description: "Provide your API key in the Authorization header.",
});
