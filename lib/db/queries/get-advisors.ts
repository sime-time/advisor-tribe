import db from "../index";
import { advisor } from "../schema/index";

export async function getAdvisors(limit?: number) {
	if (limit) {
		return await db.select().from(advisor).limit(limit);
	}
	else {
		return await db.select().from(advisor);
	}
}
