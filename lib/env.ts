import process from "node:process";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  MICROSOFT_CLIENT_ID: z.string(),
  MICROSOFT_CLIENT_SECRET: z.string(),
  NYLAS_API_KEY: z.string(),
  NYLAS_API_URI: z.string(),
  NYLAS_CLIENT_ID: z.string(),
  NUXT_PUBLIC_BASE_URL: z.string(),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

export default EnvSchema.parse(process.env);
