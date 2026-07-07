import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		host: "0.0.0.0",
		allowedHosts: ["client"],
		proxy: {
			"/health": "http://server:8000",
			"/api": "http://server:8000",
			"/web": "http://server:8000",
		},
	},
});
