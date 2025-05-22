import type { DaySchedule, NewAdvisor } from "./types";
import { eq } from "drizzle-orm";
import db from "../index";
import { advisor, availability, user } from "../schema/index";

export async function createAdvisor(newAdvisor: NewAdvisor) {
	// flag user as advisor
	await db.update(user).set({ role: "advisor" }).where(eq(user.id, newAdvisor.userId));
	return await db.insert(advisor).values(newAdvisor);
}

export async function createAdvisorSchedule(weekSchedule: DaySchedule[]) {
	try {
		weekSchedule.forEach(async (day) => {
			if (day.active) {
				await db.insert(availability).values(day);
			}
		});
	}
	catch (error) {
		console.log(error);
	}
}
