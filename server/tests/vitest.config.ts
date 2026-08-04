import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globalSetup: "./tests/vitest.global.setup.ts",
		setupFiles: "./tests/vitest.setup.ts",

		coverage: {
			provider: "v8", // or "istanbul"
			reporter: ["text"],
			reportsDirectory: "./coverage",

			include: ["src/**/*.ts"],
			exclude: [
				"src/index.ts", // app startup
				"tests/**",
				"**/*.d.ts",
			],
		},
	},
});
