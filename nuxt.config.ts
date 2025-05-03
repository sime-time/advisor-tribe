// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import "./lib/env";

export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	modules: [
		"@nuxt/eslint",
		"@nuxt/fonts",
		"@nuxt/icon",
		"@nuxt/ui",
		"@pinia/nuxt",
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
