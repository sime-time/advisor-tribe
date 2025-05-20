import type { NewAdvisor } from "./types";
import db from "../index";
import { advisor } from "../schema/index";

export async function createAdvisor(newAdvisor: NewAdvisor) {
	return await db.insert(advisor).values(newAdvisor);
}

export async function createAdvisorSchedule() {
	return null;
}
