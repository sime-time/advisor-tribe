import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { genericOAuth } from "better-auth/plugins";
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
	plugins: [
		genericOAuth({
			config: [
				{
					providerId: "calendly",
					clientId: env.CALENDLY_CLIENT_ID,
					clientSecret: env.CALENDLY_CLIENT_SECRET,
					authorizationUrl: "https://auth.calendly.com/oauth/authorize",
					tokenUrl: "https://auth.calendly.com/oauth/token",
					userInfoUrl: "https://api.calendly.com/users/me",
					mapProfileToUser: async (profile) => {
						// Get the user resources from calendly API
						// Extract the UUID from the URI
						// the UUID is in the last section of the URI
						const uuid: string = profile.resource.uri.split("/").pop();
						return {
							// drizzle id will still generate the next integer in the database
							// it won't use the uuid string as id
							id: uuid, // must not be null/undefined, or it won't work
							calendlyId: uuid,
							name: profile.resource.name,
							email: profile.resource.email,
							image: profile.resource.avatar_url,
							emailVerified: true,
						};
					},
				},
			],
		}),
	],
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
			calendlyId: {
				type: "string",
				required: false,
			},
		},
	},
});
