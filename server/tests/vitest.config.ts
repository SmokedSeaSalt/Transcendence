import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: "./tests/vitest.setup.ts",
  },
});