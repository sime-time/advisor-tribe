import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import env from "../lib/env";
import * as schema from "./schema";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});
const db = drizzle({
	client: pool,
	schema,
});

export default db;
