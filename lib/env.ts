import process from "node:process";
import { z } from "zod";

const EnvSchema = z.object({
	DATABASE_URL: z.string(),
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	MICROSOFT_CLIENT_ID: z.string(),
	MICROSOFT_CLIENT_SECRET: z.string(),
	CALENDLY_CLIENT_ID: z.string(),
	CALENDLY_CLIENT_SECRET: z.string(),
	CALENDLY_WEBHOOK_KEY: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

export default EnvSchema.parse(process.env);
