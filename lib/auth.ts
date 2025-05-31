import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db/index";
import env from "./env";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	advanced: {
		database: {
			// because we are using serial ints:
			// don't use better-auth's default id generation
			generateId: false,
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
		microsoft: {
			clientId: env.MICROSOFT_CLIENT_ID,
			clientSecret: env.MICROSOFT_CLIENT_SECRET,
		},
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: false,
			},
			phone: {
				type: "string",
				required: false,
			},
		},
	},
});
