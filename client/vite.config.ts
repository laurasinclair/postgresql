import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
import path from "path";

//@ts-ignore
const root = path.resolve(__dirname, "src");

export default defineConfig({
	plugins: [react()],
	base: "/",
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
			},
			sass: {
				quietDeps: true,
			},
		},
	},
});