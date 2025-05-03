import { defineConfig } from "drizzle-kit";
import env from "./lib/env";

export default defineConfig({
	out: "./lib/db/migrations",
	schema: "./lib/db/schema/index.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
