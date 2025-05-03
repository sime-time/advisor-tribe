import process from "node:process";
import { type } from "arktype";

const EnvSchema = type({
	DATABASE_URL: "string",
	BETTER_AUTH_SECRET: "string",
	BETTER_AUTH_URL: "string",
	GOOGLE_CLIENT_ID: "string",
	GOOGLE_CLIENT_SECRET: "string",
});

export type EnvSchema = typeof EnvSchema.infer;

export default EnvSchema.assert(process.env);
