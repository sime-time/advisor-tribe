import type { DaySchedule, NewAdvisor } from "./types";
import db from "../index";
import { advisor, availability } from "../schema/index";

export async function createAdvisor(newAdvisor: NewAdvisor) {
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
