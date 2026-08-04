import { getApiSwaggerSpec } from "./apiSpec.js";
import { getWebSwaggerSpec } from "./webSpec.js";

type ComponentSection = Record<string, unknown>;

type SwaggerComponents = {
	schemas?: ComponentSection;
	responses?: ComponentSection;
	parameters?: ComponentSection;
	requestBodies?: ComponentSection;
	headers?: ComponentSection;
	securitySchemes?: ComponentSection;
	examples?: ComponentSection;
	links?: ComponentSection;
	callbacks?: ComponentSection;
};

function mergeComponents(
	apiComponents: SwaggerComponents = {},
	webComponents: SwaggerComponents = {},
) {
	return {
		schemas: {
			...(apiComponents.schemas ?? {}),
			...(webComponents.schemas ?? {}),
		},
		responses: {
			...(apiComponents.responses ?? {}),
			...(webComponents.responses ?? {}),
		},
		parameters: {
			...(apiComponents.parameters ?? {}),
			...(webComponents.parameters ?? {}),
		},
		requestBodies: {
			...(apiComponents.requestBodies ?? {}),
			...(webComponents.requestBodies ?? {}),
		},
		headers: {
			...(apiComponents.headers ?? {}),
			...(webComponents.headers ?? {}),
		},
		securitySchemes: {
			...(apiComponents.securitySchemes ?? {}),
			...(webComponents.securitySchemes ?? {}),
		},
		examples: {
			...(apiComponents.examples ?? {}),
			...(webComponents.examples ?? {}),
		},
		links: {
			...(apiComponents.links ?? {}),
			...(webComponents.links ?? {}),
		},
		callbacks: {
			...(apiComponents.callbacks ?? {}),
			...(webComponents.callbacks ?? {}),
		},
	};
}

export function getDocsSwaggerSpec() {
	const apiSpec = getApiSwaggerSpec();
	const webSpec = getWebSwaggerSpec();

	return {
		...apiSpec,
		paths: {
			...(apiSpec.paths ?? {}),
			...(webSpec.paths ?? {}),
		},
		components: mergeComponents(apiSpec.components, webSpec.components),
	};
}
