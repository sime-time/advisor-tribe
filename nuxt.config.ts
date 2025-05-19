// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import "./lib/env";

export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	modules: [
		"@nuxt/eslint",
		"@nuxt/ui",
		"@pinia/nuxt",
		"motion-v/nuxt",
	],
	vite: {
		plugins: [tailwindcss()],
	},
	eslint: {
		config: {
			standalone: false,
		},
	},
	ui: {
		colorMode: false,
	},
});
