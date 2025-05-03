import { drizzle } from "drizzle-orm/node-postgres";
import env from "~/lib/env";
import * as schema from "./schema";

const db = drizzle({
	connection: {
		connectionString: env.DATABASE_URL,
	},
	schema,
});

export default db;
