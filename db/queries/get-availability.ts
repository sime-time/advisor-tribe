import { eq } from "drizzle-orm";
import db from "../index";
import { availability } from "../schema/index";

export async function getAvailability(userId: number) {
	const schedule = await db
		.select()
		.from(availability)
		.where(eq(availability.userId, userId));

	return schedule;
}
