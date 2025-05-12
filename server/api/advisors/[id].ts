import type { AdvisorUser } from "~/db/queries/types";
import { getFullAdvisorData } from "~/db/queries/get-advisors";

export default defineEventHandler(async (event) => {
	let advisorId: number = -1;
	if (event.context.params) {
		advisorId = Number.parseInt(event.context.params.id);
	}

	const advisors: AdvisorUser[] = await getFullAdvisorData(advisorId);
	return advisors[0] as AdvisorUser; // this array will have 1 item
});
