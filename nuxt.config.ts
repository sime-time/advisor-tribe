// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import "./lib/env";

export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/image", "@pinia/nuxt", "motion-v/nuxt"],
	app: {
		head: {
			title: "Advisor Tribe",
			htmlAttrs: {
				lang: "en",
			},
			meta: [
				{ name: "description", content: "Get expert business advice from a personal board of advisors." },
			],
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			],
		},
	},
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
