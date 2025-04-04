import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import dotenv from "dotenv";
dotenv.config({ path: "/app_data/.env" });

var PORT = process.env.CLIENT_PORT;
let open = false;

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../.env") });
	PORT = process.env.CLIENT_PORT;
	open = true;
}

export default defineConfig({
	plugins: [react()],
	server: {
		port: PORT,
		host: true,
		open: open,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./setupTests.js",
	},
});
