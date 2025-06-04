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
      // because we are using serial int primary keys:
      // don't use better-auth's default uuid generation
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: false,
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
      linkName: {
        type: "string",
        required: false,
      },
      timeZone: {
        type: "string",
        required: false,
      },
      grantId: {
        type: "string",
        required: false,
      },
      grantEmail: {
        type: "string",
        required: false,
      },
    },
  },
});
